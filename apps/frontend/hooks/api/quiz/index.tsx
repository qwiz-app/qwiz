import { Prisma, Quiz } from '@prisma/client';
import { queryOnError as onError } from 'lib/axios';
import { generateArrayForRange } from 'lib/utils';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  createQuiz,
  fetchQuiz,
  fetchQuizzes,
  updateQuiz,
} from 'services/api/quiz';

export const useQuizzes = () =>
  useQuery('quizzes', fetchQuizzes, {
    onError,
    placeholderData: placholderQuizzes,
  });

export const useQuiz = (id: string) =>
  useQuery(['quiz', id], ({ queryKey }) => fetchQuiz(queryKey[1]), {
    onError,
    enabled: !!id,
  });

export const useQuizCreate = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (values: Prisma.QuizCreateWithoutOwnerInput) => createQuiz(values),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('quizzes');
      },
    }
  );
};

export const useQuizUpdate = (quizId: string) => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: Prisma.QuizUpdateInput) => updateQuiz(quizId, data),
    {
      // TODO: OPTIMISTIC UPDATE NAME - could be done better, by id?
      onMutate: async (newQuiz) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries(['quizzes', quizId]);

        // Snapshot the previous value
        const previousQuizzes = queryClient.getQueryData('quizzes') as Quiz[];
        const updatedQuizzes = previousQuizzes.map((quiz) =>
          quiz.id !== quizId ? quiz : { ...quiz, ...newQuiz }
        );

        // Optimistically update to the new value
        queryClient.setQueryData('quizzes', () => updatedQuizzes);

        // Return a context object with the snapshotted value
        return { previousQuizzes };
      },
      onError: (err, newData, context) => {
        queryClient.setQueryData('quizzes', context.previousQuizzes);
      },
      onSettled: (newQuiz) => {
        // queryClient.invalidateQueries('quizzes', newQuiz.id);
        queryClient.invalidateQueries('quizzes');
      },
    }
  );
};

// TODO: do we need a placholder when we are just showing skeletons?
export const placholderQuizzes = generateArrayForRange(4).map((_, idx) => ({
  id: `${idx}`,
  name: 'Vue Quiz 1.0?',
  description: 'Show off your vue knowledge',
  thumbnail: null,
  published: false,
  ownerId: '',
  createdAt: new Date(),
  updatedAt: new Date(),
  owner: {
    id: '',
    name: 'Undefined Pub',
    userId: '',
    user: {
      id: '',
      name: 'Undefined Mc2',
      email: 'undefined.mc2@gmail.com',
      emailVerified: null,
      image:
        'https://source.boringavatars.com/marble/120/2cce6d6c5d9614ac294d03a0cd030815e794750d?square',
      role: 'ORGANIZATION',
    },
  },
}));
