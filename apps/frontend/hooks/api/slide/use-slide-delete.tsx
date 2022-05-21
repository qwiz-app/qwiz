import { useQueryClient, useMutation } from 'react-query';
import { deleteSlide } from 'services/api/slide';

export const useSlideDelete = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation(() => deleteSlide(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('slides');
      queryClient.invalidateQueries(['slide']);
    },
  });
};
