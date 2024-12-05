import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useFormStore } from '../../store/formStore';
import { Plus, Trash2 } from 'lucide-react';

export function ComprehensionContent({ question }) {
  const { updateQuestion } = useFormStore();
  const [newOption, setNewOption] = useState('');

  const handlePassageChange = (e) => {
    updateQuestion(question.id, {
      ...question,
      passage: e.target.value,
    });
  };

  const handleAddSubQuestion = () => {
    const updatedQuestion = {
      ...question,
      subQuestions: [
        ...(question.subQuestions || []),
        {
          id: crypto.randomUUID(),
          question: '',
          options: [],
          correctAnswer: '',
        },
      ],
    };
    updateQuestion(question.id, updatedQuestion);
  };

  const handleSubQuestionChange = (subQuestionId, field, value) => {
    const updatedQuestion = {
      ...question,
      subQuestions: question.subQuestions.map((sq) =>
        sq.id === subQuestionId ? { ...sq, [field]: value } : sq
      ),
    };
    updateQuestion(question.id, updatedQuestion);
  };

  const handleAddOption = (subQuestionId) => {
    if (!newOption.trim()) return;

    const updatedQuestion = {
      ...question,
      subQuestions: question.subQuestions.map((sq) =>
        sq.id === subQuestionId
          ? { ...sq, options: [...sq.options, newOption.trim()] }
          : sq
      ),
    };
    updateQuestion(question.id, updatedQuestion);
    setNewOption('');
  };

  const handleRemoveOption = (subQuestionId, optionIndex) => {
    const updatedQuestion = {
      ...question,
      subQuestions: question.subQuestions.map((sq) =>
        sq.id === subQuestionId
          ? {
              ...sq,
              options: sq.options.filter((_, index) => index !== optionIndex),
              correctAnswer:
                sq.correctAnswer === sq.options[optionIndex] ? '' : sq.correctAnswer,
            }
          : sq
      ),
    };
    updateQuestion(question.id, updatedQuestion);
  };

  return (
    <div className="mt-4 space-y-6 text-gray-200">
  <div className="space-y-4">
    <label className="block text-sm font-medium text-gray-300">Reading Passage</label>
    <textarea
      value={question.passage || ''}
      onChange={handlePassageChange}
      className="w-full h-32 p-4 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 placeholder-gray-400"
      placeholder="Enter the reading passage here..."
    />
  </div>

  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h3 className="font-medium text-gray-300">Questions</h3>
      <button
        onClick={handleAddSubQuestion}
        className="px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-500 hover:from-purple-500 hover:to-blue-600 text-white rounded-lg flex items-center gap-2 text-sm"
      >
        <Plus size={16} />
        Add Question
      </button>
    </div>

    {question.subQuestions?.map((subQuestion) => (
      <div key={subQuestion.id} className="border border-gray-600 rounded-lg p-4 space-y-4 bg-gray-700">
        <input
          type="text"
          value={subQuestion.question}
          onChange={(e) =>
            handleSubQuestionChange(subQuestion.id, 'question', e.target.value)
          }
          className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 placeholder-gray-400"
          placeholder="Enter question..."
        />

        <div className="space-y-4">
          <div className="flex gap-4 items-center">
            <input
              type="text"
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              className="flex-1 p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 placeholder-gray-400"
              placeholder="Add an option..."
            />
            <button
              onClick={() => handleAddOption(subQuestion.id)}
              className="px-4 py-3 bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-600 text-white rounded-lg flex items-center gap-2"
            >
              <Plus size={16} />
            </button>
          </div>

          {subQuestion.options.map((option, index) => (
            <div key={index} className="flex items-center gap-4">
              <input
                type="radio"
                name={`correct-${subQuestion.id}`}
                checked={subQuestion.correctAnswer === option}
                onChange={() =>
                  handleSubQuestionChange(subQuestion.id, 'correctAnswer', option)
                }
                className="w-4 h-4 text-blue-600"
              />
              <span className="flex-1 text-gray-200">{option}</span>
              <button
                onClick={() => handleRemoveOption(subQuestion.id, index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
</div>

  );
}

ComprehensionContent.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['comprehension']).isRequired,
    passage: PropTypes.string,
    subQuestions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        question: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(PropTypes.string).isRequired,
        correctAnswer: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
};