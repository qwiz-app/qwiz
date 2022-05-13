import { Prisma, Quiz } from '@prisma/client';
import { useQueryClient, useMutation } from 'react-query';
import { updateQuiz } from 'services/api/quiz';

export const useQuizUpdate = (quizId: string) => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: Prisma.QuizUpdateInput) => updateQuiz(quizId, data),
    {
      // TODO: OPTIMISTIC UPDATE NAME - could be done better, by id?
      onMutate: async (newQuiz) => {
        // await queryClient.cancelQueries(['quizzes', quizId]);
        await queryClient.cancelQueries(['quizzes']);

        const previousQuizzes = queryClient.getQueryData('quizzes') as Quiz[];

        const updatedQuizzes = previousQuizzes.map((quiz) =>
          quiz.id !== quizId ? quiz : { ...quiz, ...newQuiz }
        );

        queryClient.setQueryData('quizzes', updatedQuizzes);

        return { previousQuizzes };
      },
      onError(err, variables, context: { previousQuizzes: Quiz[] }) {
        if (context?.previousQuizzes) {
          queryClient.setQueryData<Quiz[]>('quizzes', context.previousQuizzes);
        }
      },
      onSettled: (newQuiz) => {
        // queryClient.invalidateQueries('quizzes', newQuiz.id);
        queryClient.invalidateQueries('quizzes');
      },
    }
  );
};