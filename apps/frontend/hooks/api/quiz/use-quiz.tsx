import { useQuery } from 'react-query';
import { fetchQuiz } from 'services/api/quiz';
import { onError } from 'lib/axios';

export const useQuiz = (id: string) =>
  useQuery(['quiz', id], ({ queryKey }) => fetchQuiz(queryKey[1]), {
    onError,
    enabled: !!id,
  });
