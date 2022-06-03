import { onError } from 'lib/axios';
import { generateArrayForRange } from 'lib/utils';
import { useQuery } from 'react-query';
import { fetchSlidesForQuiz } from 'services/api/slide';

export const useSlides = (quizId: string, isEdit = false) =>
  useQuery(
    ['slides', quizId],
    ({ queryKey }) => fetchSlidesForQuiz(queryKey[1]),
    {
      onError,
      enabled: !!quizId && !isEdit,
      placeholderData,
    }
  );

const placeholderData = generateArrayForRange(5).map((_, idx) => ({
  id: `slide-${idx}`,
  quizId: '',
  ordinal: 1,
  backgroundColor: null,
  elements: [],
  quizQuestion: {
    id: '',
    quizId: '',
    questionId: '',
    quizSlideId: `slide-${idx}`,
    scoringModeId: 1,
    question: {
      id: '',
      ownerId: '',
      questionModeId: 1,
      isGlobal: false,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      contents: [],
    },
  },
}));
