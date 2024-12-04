import mongoose from 'mongoose';

const formSubmissionSchema = new mongoose.Schema({
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Form',
    required: true,
  },
  answers: {
    type: Object,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

export const FormSubmission = mongoose.model('FormSubmission', formSubmissionSchema);