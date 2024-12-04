import React from 'react';

export function ComprehensionRenderer({ question, answers, setAnswers }) {
  const handleAnswerChange = (subQuestionId, value) => {
    setAnswers({
      ...answers,
      answers: {
        ...answers.answers,
        [subQuestionId]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="prose max-w-none">
        <p className="text-lg leading-relaxed bg-gray-50 p-4 rounded-lg">
          {question.passage}
        </p>
      </div>

      <div className="space-y-6">
        {question.subQuestions.map((subQuestion) => (
          <div key={subQuestion.id} className="space-y-3">
            <p className="font-medium">{subQuestion.question}</p>
            <div className="space-y-2">
              {subQuestion.options.map((option, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`question-${subQuestion.id}`}
                    value={option}
                    checked={answers.answers[subQuestion.id] === option}
                    onChange={() => handleAnswerChange(subQuestion.id, option)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}