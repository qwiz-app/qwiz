import { useQueryClient, useMutation } from 'react-query';
import { createQuiz } from 'services/api/quiz';

export const useQuizCreate = () => {
  const queryClient = useQueryClient();

  return useMutation(createQuiz, {
    onSuccess: () => {
      queryClient.invalidateQueries('quizzes');
    },
  });
};
