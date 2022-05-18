import { useMutation, useQueryClient } from 'react-query';
import { createQuizQuestion } from 'services/api/quiz-question';

export const useQuizQuestionCreate = (slideId: string) => {
  const queryClient = useQueryClient();

  return useMutation(createQuizQuestion, {
    onSuccess: () => {
      queryClient.invalidateQueries(['slide', slideId]);
    },
  });
};
