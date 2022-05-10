import { onError } from 'lib/axios';
import { generateArrayForRange } from 'lib/utils';
import { useQuery } from 'react-query';
import { fetchQuizzes } from 'services/api/quiz';

export const useQuizzes = () =>
  useQuery('quizzes', fetchQuizzes, {
    onError,
    placeholderData: placholderQuizzes,
  });

// TODO: do we need a placholder when we are just showing skeletons?
const placholderQuizzes = generateArrayForRange(4).map((_, idx) => ({
  id: `${idx}`,
  name: '',
  description: '',
  thumbnail: null,
  published: false,
  ownerId: '',
  createdAt: new Date(),
  updatedAt: new Date(),
  owner: {
    id: '',
    name: '',
    userId: '',
    user: {
      id: '',
      name: '',
      email: '',
      emailVerified: null,
      image: '',
      role: '',
    },
  },
}));
