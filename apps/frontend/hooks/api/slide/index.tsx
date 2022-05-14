import { useQuery } from 'react-query';
import { onError } from 'lib/axios';
import { fetchSlide } from 'services/api/slide';

export const useSlide = (id: string) =>
  useQuery(['quiz', id], ({ queryKey }) => fetchSlide(queryKey[1]), {
    onError,
    enabled: !!id,
  });
