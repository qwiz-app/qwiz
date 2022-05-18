import { useMutation, useQuery, useQueryClient } from 'react-query';
import { onError } from 'lib/axios';
import {
  createContent,
  createSlide,
  deleteContent,
  deleteSlide,
  fetchSlide,
} from 'services/api/slide';

export const useSlide = (id: string) =>
  useQuery(['slide', id], ({ queryKey }) => fetchSlide(queryKey[1]), {
    onError,
    enabled: !!id,
  });

export const useSlideCreate = () => {
  const queryClient = useQueryClient();

  return useMutation(createSlide, {
    onSuccess: () => {
      queryClient.invalidateQueries('slides');
    },
  });
};

export const useSlideDelete = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation(() => deleteSlide(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('slides');
      queryClient.invalidateQueries(['slide']);
    },
  });
};

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
