import { useMutation, useQuery, useQueryClient } from 'react-query';
import { onError } from 'lib/axios';
import { createContent, deleteContent, fetchSlide } from 'services/api/slide';

export const useSlide = (id: string) =>
  useQuery(['slide', id], ({ queryKey }) => fetchSlide(queryKey[1]), {
    onError,
    enabled: !!id,
  });

export const useQuestionContentCreate = (slideId: string) => {
  const queryClient = useQueryClient();

  return useMutation(createContent, {
    onSuccess: () => {
      queryClient.invalidateQueries(['slide', slideId]);
    },
  });
};

export const useQuestionContentDelete = (slideId: string) => {
  const queryClient = useQueryClient();

  return useMutation(deleteContent, {
    onSuccess: () => {
      queryClient.invalidateQueries(['slide', slideId]);
    },
  });
};
