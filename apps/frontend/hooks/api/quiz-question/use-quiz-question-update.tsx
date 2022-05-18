import { Prisma } from '@prisma/client';
import { useMutation, useQueryClient } from 'react-query';
import { updateQuizQuestion } from 'services/api/quiz-question';

export const useQuizQuestionUpdate = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: Prisma.QuizQuestionUncheckedUpdateInput) =>
      updateQuizQuestion(id, data),
    {
      onSettled: () => {
        queryClient.invalidateQueries(['slide']);
      },
    }
  );
};
