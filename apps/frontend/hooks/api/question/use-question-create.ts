import { useMutation, useQueryClient } from 'react-query';
import { createQuestion } from 'services/api/questions';

export const useQuestionCreate = () => {
  const queryClient = useQueryClient();

  return useMutation(createQuestion, {
    onSuccess: () => {
      queryClient.invalidateQueries('questions');
    },
  });
};
