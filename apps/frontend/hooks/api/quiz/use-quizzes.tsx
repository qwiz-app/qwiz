import { onError } from 'lib/axios';
import { generateArrayForRange } from 'lib/utils';
import { useQuery } from 'react-query';
import { fetchQuizzes } from 'services/api/quiz';
import { QuizWithOrganization } from 'types/quiz';

export const useQuizzes = () =>
  useQuery('quizzes', fetchQuizzes, {
    onError,
    placeholderData,
  });

const placeholderData: QuizWithOrganization[] = generateArrayForRange(4).map(
  (_, idx) => ({
    id: `quiz-${idx}`,
    name: '',
    description: '',
    thumbnail: null,
    published: false,
    ownerId: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    slides: [],
    owner: {
      id: '',
      name: '',
      userId: '',
      user: {
        id: '',
        name: '',
        email: '',
        emailVerified: null,
        image: null,
        role: 'ORGANIZATION',
      },
    },
  })
);
