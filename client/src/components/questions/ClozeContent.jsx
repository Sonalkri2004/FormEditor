import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useFormStore } from '../../store/formStore';
import { Plus } from 'lucide-react';

export function ClozeContent({ question }) {
  const { updateQuestion } = useFormStore();
  const [text, setText] = useState(question.text || '');
  const [selectedWord, setSelectedWord] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
    updateQuestion(question.id, {
      ...question,
      text: e.target.value,
    });
  };

  const handleWordSelect = () => {
    const selection = window.getSelection().toString().trim();
    if (selection) {
      setSelectedWord(selection);
    }
  };

  const handleCreateBlank = () => {
    if (!selectedWord || !text.includes(selectedWord)) return;

    const updatedText = text.replace(selectedWord, '_'.repeat(selectedWord.length));
    const updatedBlanks = [...(question.blanks || []), selectedWord];

    updateQuestion(question.id, {
      ...question,
      text: updatedText,
      blanks: updatedBlanks,
    });

    setText(updatedText);
    setSelectedWord('');
  };

  return (
    <div className="mt-4 space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Text Content
        </label>
        <textarea
          value={text}
          onChange={handleTextChange}
          onMouseUp={handleWordSelect}
          className="w-full h-32 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your text here. Select words to convert them into blanks..."
        />
      </div>

      {selectedWord && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            Selected word: <strong>{selectedWord}</strong>
          </span>
          <button
            onClick={handleCreateBlank}
            className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-1 text-sm"
          >
            <Plus size={16} />
            Make Blank
          </button>
        </div>
      )}

      {question.blanks?.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-gray-700">Answer Key:</h4>
          <div className="flex flex-wrap gap-2">
            {question.blanks.map((word, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

ClozeContent.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['cloze']).isRequired,
    text: PropTypes.string,
    blanks: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};