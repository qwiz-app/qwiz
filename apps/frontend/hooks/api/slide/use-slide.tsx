import { onError } from 'lib/axios';
import { useQuery, useQueryClient } from 'react-query';
import { fetchSlide } from 'services/api/slide';
import { SlideWithQuestion } from 'types/api/slide';

export const useSlide = (id: string, quizId: string) => {
  const queryClient = useQueryClient();

  return useQuery(['slide', id], ({ queryKey }) => fetchSlide(queryKey[1]), {
    onError,
    enabled: !!id && id !== 'edit',
    initialData: () => {
      const cachedSlides = queryClient.getQueryData([
        'slides',
        quizId,
      ]) as SlideWithQuestion[];
      return cachedSlides?.find((slide) => slide.id === id);
    },
  });
};
