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

// TODO: do we need a placholder when we are just showing skeletons?
const placeholderData: QuizWithOrganization[] = generateArrayForRange(4).map(
  (_, idx) => ({
    id: `${idx}`,
    name: '',
    description: '',
    thumbnail: null,
    published: false,
    ownerId: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    slides: [
      {
        id: `${idx}`,
        quizId: `${idx}`,
        backgroundColor: '#ffffff',
        ordinal: 1,
        elements: [],
        question: {
          id: `${idx}`,
          quizId: `${idx}`,
          questionId: `${idx}`,
          quizSlideId: `${idx}`,
          scoringModeId: idx,
        },
      },
    ],
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
        role: 'ORGANIZATION',
      },
    },
  })
);
