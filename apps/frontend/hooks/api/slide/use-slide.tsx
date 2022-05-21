import { onError } from 'lib/axios';
import { useQuery } from 'react-query';
import { fetchSlide } from 'services/api/slide';

export const useSlide = (id: string) =>
  useQuery(['slide', id], ({ queryKey }) => fetchSlide(queryKey[1]), {
    onError,
    enabled: !!id && id !== 'edit',
  });
