import { Prisma } from '@prisma/client';
import { queryOnError as onError } from 'lib/axios';
import { generateArrayForRange } from 'lib/utils';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { createQuiz, fetchQuiz, fetchQuizzes } from 'services/api/quiz';

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

export const useCreateQuiz = () => {
  const queryClient = useQueryClient();

  // TODO: invalidate only our own quizzes: make backend only return our quizzes
  queryClient.invalidateQueries('quizzes');

  return useMutation((values: Prisma.QuizCreateWithoutOwnerInput) =>
    createQuiz(values)
  );
};

export const placholderQuizzes = generateArrayForRange(6).map((_, idx) => ({
  id: `${idx}`,
  name: '',
  thumbnail: '',
  published: true,
  loading: true,
  description: '',
  ownerId: '',
  createdAt: new Date(),
  updatedAt: new Date(),
}));
