import { useQueryClient, useMutation } from 'react-query';
import { deleteContent } from 'services/api/slide';

export const useQuestionContentDelete = (slideId: string) => {
  const queryClient = useQueryClient();

  return useMutation(deleteContent, {
    onSuccess: () => {
      queryClient.invalidateQueries(['slide', slideId]);
    },
  });
};
