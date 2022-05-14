import { onError } from 'lib/axios';
import { useQuery } from 'react-query';
import { fetchQuiz } from 'services/api/quiz';

export const useQuiz = (id: string) =>
  useQuery(['quiz', id], ({ queryKey }) => fetchQuiz(queryKey[1]), {
    onError,
    enabled: !!id,
  });
