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
    <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
  <button
    onClick={() => handleAddQuestion('categorize')}
    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-500 hover:from-purple-500 hover:to-blue-600 text-white rounded-lg transition-transform transform hover:scale-105"
  >
    <Plus size={20} />
    Add Categorize
  </button>
  <button
    onClick={() => handleAddQuestion('cloze')}
    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-400 to-green-500 hover:from-green-500 hover:to-purple-600 text-white rounded-lg transition-transform transform hover:scale-105"
  >
    <Plus size={20} />
    Add Cloze
  </button>
  <button
    onClick={() => handleAddQuestion('comprehension')}
    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-600 text-white rounded-lg transition-transform transform hover:scale-105"
  >
    <Plus size={20} />
    Add Comprehension
  </button>
</div>

  );
}