import React from 'react';
import PropTypes from 'prop-types';
import { CategorizeContent } from './CategorizeContent';
import { ClozeContent } from './ClozeContent';
import { ComprehensionContent } from './ComprehensionContent';

export function QuestionTypeContent({ question }) {
  switch (question.type) {
    case 'categorize':
      return <CategorizeContent question={question} />;
    case 'cloze':
      return <ClozeContent question={question} />;
    case 'comprehension':
      return <ComprehensionContent question={question} />;
    default:
      return null;
  }
}

QuestionTypeContent.propTypes = {
  question: PropTypes.shape({
    type: PropTypes.oneOf(['categorize', 'cloze', 'comprehension']).isRequired,
  }).isRequired,
};