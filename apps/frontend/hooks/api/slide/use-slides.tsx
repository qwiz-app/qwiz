import { onError } from 'lib/axios';
import { useQuery } from 'react-query';
import { fetchSlidesForQuiz } from 'services/api/slide';

export const useSlides = (quizId: string, isEdit = false) =>
  useQuery(
    ['slides', quizId],
    ({ queryKey }) => fetchSlidesForQuiz(queryKey[1]),
    {
      onError,
      enabled: !!quizId && !isEdit,
    }
  );
