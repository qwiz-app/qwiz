import { onError } from 'lib/axios';
import { useQuery } from 'react-query';
import { fetchQuiz } from 'services/api/quiz';

export const useEvent = (id: string) =>
  useQuery(['events', id], ({ queryKey }) => fetchQuiz(queryKey[1]), {
    onError,
    enabled: !!id,
  });
