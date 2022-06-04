import { Quiz } from '@prisma/client';
import { useMutation, useQueryClient } from 'react-query';
import { deleteQuiz } from 'services/api/quiz';

export const useQuizDelete = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation(() => deleteQuiz(id), {
    onMutate: async () => {
      await queryClient.cancelQueries(['quizzes']);

      const previousQuizzes = queryClient.getQueryData('quizzes') as Quiz[];

      queryClient.setQueryData(
        'quizzes',
        previousQuizzes.filter((quiz) => quiz.id !== id)
      );

      return { previousQuizzes };
    },
    onError(err, variables, context: { previousQuizzes: Quiz[] }) {
      if (context?.previousQuizzes) {
        queryClient.setQueryData<Quiz[]>('quizzes', context.previousQuizzes);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('quizzes');
    },
  });
};
