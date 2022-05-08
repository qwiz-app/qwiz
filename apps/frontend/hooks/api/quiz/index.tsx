import { Prisma } from '@prisma/client';
import { queryOnError as onError } from 'lib/axios';
import { generateArrayForRange } from 'lib/utils';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  createQuiz,
  fetchQuiz,
  fetchQuizzesByCurrentOwner,
} from 'services/api/quiz';

export const useQuizzes = () =>
  useQuery('quizzes', fetchQuizzesByCurrentOwner, {
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

// TODO: do we need a placholder when we are just showing skeletons?
export const placholderQuizzes = generateArrayForRange(6).map((_, idx) => ({
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
