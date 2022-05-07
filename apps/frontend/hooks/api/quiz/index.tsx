import { Prisma } from '@prisma/client';
import { queryOnError as onError } from 'lib/axios';
import { useMutation, useQuery } from 'react-query';
import { createQuiz, fetchQuizzes, fetchQuiz } from 'services/api/quiz';

export const useQuizzes = () =>
  useQuery(['quizzes'], fetchQuizzes, {
    onError,
    placeholderData: skeletonData(),
  });

export const useQuiz = (id: string) =>
  useQuery(['quiz', id], ({ queryKey }) => fetchQuiz(queryKey[1]), {
    onError,
    enabled: !!id,
  });

export const useCreateQuiz = () =>
  useMutation((values: Prisma.QuizUncheckedCreateInput) => createQuiz(values));

const skeletonData = () => {
  const dummyArr = [0, 1, 2];

  return dummyArr.map((_, idx) => ({
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
};
