import { create } from 'zustand';

const initialForm = {
  id: crypto.randomUUID(),
  title: 'Untitled Form',
  description: 'Form description',
  questions: [],
};

export const useFormStore = create((set) => ({
  currentForm: initialForm,
  setCurrentForm: (form) => set({ currentForm: form }),
  addQuestion: (question) => {
    const defaultQuestionData = {
      categorize: {
        categories: [],
        items: [],
      },
      cloze: {
        text: '',
        blanks: [],
      },
      comprehension: {
        passage: '',
        subQuestions: [],
      },
    };

    const questionWithDefaults = {
      ...question,
      ...defaultQuestionData[question.type],
    };

    set((state) => ({
      currentForm: state.currentForm
        ? {
            ...state.currentForm,
            questions: [...state.currentForm.questions, questionWithDefaults],
          }
        : null,
    }));
  },
  updateQuestion: (questionId, question) =>
    set((state) => ({
      currentForm: state.currentForm
        ? {
            ...state.currentForm,
            questions: state.currentForm.questions.map((q) =>
              q.id === questionId ? question : q
            ),
          }
        : null,
    })),
  removeQuestion: (questionId) =>
    set((state) => ({
      currentForm: state.currentForm
        ? {
            ...state.currentForm,
            questions: state.currentForm.questions.filter((q) => q.id !== questionId),
          }
        : null,
    })),
}));