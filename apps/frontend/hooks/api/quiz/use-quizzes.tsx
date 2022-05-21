import { QuizSlide } from '@prisma/client';
import { onError } from 'lib/axios';
import { generateArrayForRange } from 'lib/utils';
import { useQuery } from 'react-query';
import { fetchQuizzes } from 'services/api/quiz';
import { QuizWithSlides } from 'types/api/quiz';

export const useQuizzes = () =>
  useQuery('quizzes', fetchQuizzes, {
    onError,
    placeholderData,
  });

const placeholderData: QuizWithSlides[] = generateArrayForRange(4).map(
  (_, idx) => ({
    _count: {
      questions: 1,
      event: 1,
      slides: 1,
    },
    id: `quiz-${idx}`,
    name: '',
    description: '',
    thumbnail: null,
    published: false,
    ownerId: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    slides: [] as QuizSlide[],
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
