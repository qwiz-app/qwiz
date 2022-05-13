import { onError } from 'lib/axios';
import { useQuery } from 'react-query';
import { fetchQuestion } from 'services/api/questions';

export const useQuestion = (id: string) =>
  useQuery(['question', id], ({ queryKey }) => fetchQuestion(queryKey[1]), {
    onError,
    enabled: !!id,
  });
