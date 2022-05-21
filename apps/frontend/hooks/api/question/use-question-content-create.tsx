import { useQueryClient, useMutation } from 'react-query';
import { createContent } from 'services/api/slide';

export const useQuestionContentCreate = (slideId: string) => {
  const queryClient = useQueryClient();

  return useMutation(createContent, {
    onSuccess: () => {
      queryClient.invalidateQueries(['slide', slideId]);
    },
  });
};
