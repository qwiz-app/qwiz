import { Prisma, Quiz } from '@prisma/client';
import { useMutation, useQueryClient } from 'react-query';
import { updateQuiz } from 'services/api/quiz';

export const useQuizUpdate = (quizId: string) => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: Prisma.QuizUpdateInput) => updateQuiz(quizId, data),
    {
      onMutate: async (newQuiz) => {
        await queryClient.cancelQueries(['quiz', quizId]);
        await queryClient.cancelQueries('quizzes');

        const previousQuizzes = queryClient.getQueryData('quizzes') as Quiz[];
        const previousQuizCache = queryClient.getQueryData([
          'quiz',
          quizId,
        ]) as Quiz;

        // Update single
        const previousQuiz =
          previousQuizCache ?? previousQuizzes?.find((q) => q.id === quizId);
        const updatedQuiz = { ...previousQuiz, ...newQuiz };

        // Update list
        const updatedQuizzes = previousQuizzes?.map((quiz) =>
          quiz.id !== quizId ? quiz : { ...quiz, ...newQuiz }
        );

        queryClient.setQueryData(['quiz', quizId], updatedQuiz);
        queryClient.setQueryData('quizzes', updatedQuizzes);

        return { previousQuiz, previousQuizzes };
      },
      onError(
        err,
        variables,
        context: { previousQuiz: Quiz; previousQuizzes: Quiz[] }
      ) {
        if (context?.previousQuiz) {
          queryClient.setQueryData<Quiz>(
            ['quiz', quizId],
            context.previousQuiz
          );
        }
        if (context?.previousQuizzes) {
          queryClient.setQueryData<Quiz[]>('quizzes', context.previousQuizzes);
        }
      },
      onSettled: (newQuiz) => {
        queryClient.invalidateQueries(['quiz', quizId]);
        queryClient.invalidateQueries('quizzes');
      },
    }
  );
};
