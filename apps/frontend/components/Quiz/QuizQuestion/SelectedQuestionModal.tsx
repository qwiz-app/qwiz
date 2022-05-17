import React from 'react';
import { QuestionWithContentAndOwnerAndCategoriesAndMode } from 'types/question';

interface Props {
  question: QuestionWithContentAndOwnerAndCategoriesAndMode;
}

const SelectedQuestionModal = ({ question }: Props) => {
  return <div>Question id: {question.id}</div>;
};

export default SelectedQuestionModal;
