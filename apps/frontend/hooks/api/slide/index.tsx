import { onError } from 'lib/axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  createContent,
  createSlide,
  deleteContent,
  deleteSlide,
  fetchSlide,
  fetchSlidesForQuiz
} from 'services/api/slide';

export const useSlides = (quizId: string, isEdit = false) =>
  useQuery(
    ['slides', quizId],
    ({ queryKey }) => fetchSlidesForQuiz(queryKey[1]),
    {
      onError,
      enabled: !!quizId && !isEdit,
    }
  );

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
  return useMutation(() => deleteSlide(id), {});
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
