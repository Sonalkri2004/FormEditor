import mongoose from 'mongoose';

const formSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  headerImage: String,
  questions: [{
    type: {
      type: String,
      enum: ['categorize', 'cloze', 'comprehension'],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    imageUrl: String,
    // Categorize specific fields
    categories: [String],
    items: [{
      id: String,
      content: String,
      category: String,
    }],
    // Cloze specific fields
    text: String,
    blanks: [String],
    // Comprehension specific fields
    passage: String,
    subQuestions: [{
      id: String,
      question: String,
      options: [String],
      correctAnswer: String,
    }],
  }],
}, {
  timestamps: true,
});

export const Form = mongoose.model('Form', formSchema);