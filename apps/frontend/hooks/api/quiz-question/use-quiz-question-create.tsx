import { useMutation } from 'react-query';
import { createQuizQuestion } from 'services/api/quiz-question';

export const useQuizQuestionCreate = () => {
  return useMutation(createQuizQuestion);
};
