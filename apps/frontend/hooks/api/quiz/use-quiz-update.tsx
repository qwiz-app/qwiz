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
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        // await queryClient.cancelQueries(['quizzes', quizId]);
        await queryClient.cancelQueries(['quizzes']);

        // Snapshot the previous value
        const previousQuizzes = queryClient.getQueryData('quizzes') as Quiz[];

        // TODO: updatedAt not updated immediately beacuse no access to response yet
        const updatedQuizzes = previousQuizzes.map((quiz) =>
          quiz.id !== quizId ? quiz : { ...quiz, ...newQuiz }
        );

        // Optimistically update to the new value
        queryClient.setQueryData('quizzes', updatedQuizzes);

        // Return a context object with the snapshotted value
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
