import { Prisma } from '@prisma/client';
import { queryOnError as onError } from 'lib/axios';
import { useMutation, useQuery } from 'react-query';
import {
  createQuiz,
  fetchQuizzes,
  fetchQuiz,
} from 'services/api/quiz';

export const useQuizzes = () =>
  useQuery(['quizzes'], fetchQuizzes, {
    onError,
  });

export const useQuiz = (id: string) =>
  useQuery(['quiz', id], ({ queryKey }) => fetchQuiz(queryKey[1]), {
    onError,
    enabled: !!id,
  });

export const useCreateQuiz = () =>
  useMutation((values: Prisma.QuizUncheckedCreateInput) => createQuiz(values));
