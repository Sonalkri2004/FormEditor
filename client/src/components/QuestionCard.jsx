import React from 'react';
import PropTypes from 'prop-types';
import { Trash2, Image } from 'lucide-react';
import { useFormStore } from '../store/formStore';
import { QuestionTypeContent } from './questions/QuestionTypeContent';

export function QuestionCard({ question }) {
  const { removeQuestion, updateQuestion } = useFormStore();

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateQuestion(question.id, {
          ...question,
          imageUrl: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <input
            type="text"
            value={question.title}
            onChange={(e) =>
              updateQuestion(question.id, { ...question, title: e.target.value })
            }
            className="text-lg font-semibold bg-transparent border-none focus:outline-none"
          />
          <div className="text-sm text-gray-500">Type: {question.type}</div>
        </div>
        <div className="flex gap-2">
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <Image className="w-5 h-5 text-gray-500 hover:text-gray-700" />
          </label>
          <button
            onClick={() => removeQuestion(question.id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {question.imageUrl && (
        <img
          src={question.imageUrl}
          alt="Question"
          className="w-full h-32 object-cover rounded-lg mb-4"
        />
      )}

      <QuestionTypeContent question={question} />
    </div>
  );
}

QuestionCard.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['categorize', 'cloze', 'comprehension']).isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
};