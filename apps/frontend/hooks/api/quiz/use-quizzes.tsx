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
