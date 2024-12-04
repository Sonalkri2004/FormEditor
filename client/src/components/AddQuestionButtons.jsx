import React from 'react';
import { Plus } from 'lucide-react';
import { useFormStore } from '../store/formStore';

export function AddQuestionButtons() {
  const { addQuestion } = useFormStore();

  const handleAddQuestion = (type) => {
    addQuestion({
      id: crypto.randomUUID(),
      type,
      title: `New ${type} question`,
    });
  };

  return (
    <div className="mt-6 flex gap-4">
      <button
        onClick={() => handleAddQuestion('categorize')}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        <Plus size={20} />
        Add Categorize
      </button>
      <button
        onClick={() => handleAddQuestion('cloze')}
        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        <Plus size={20} />
        Add Cloze
      </button>
      <button
        onClick={() => handleAddQuestion('comprehension')}
        className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
      >
        <Plus size={20} />
        Add Comprehension
      </button>
    </div>
  );
}