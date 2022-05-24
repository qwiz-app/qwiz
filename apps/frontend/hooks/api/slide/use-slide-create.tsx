import { useQueryClient, useMutation } from 'react-query';
import { createSlide } from 'services/api/slide';

export const useSlideCreate = () => {
  const queryClient = useQueryClient();

  return useMutation(createSlide, {
    onSuccess: () => {
      queryClient.invalidateQueries('slides');
    },
  });
};
