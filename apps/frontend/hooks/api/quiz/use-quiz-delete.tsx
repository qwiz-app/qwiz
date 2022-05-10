import { useQueryClient, useMutation } from 'react-query';
import { deleteQuiz } from 'services/api/quiz';

export const useQuizDelete = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation(() => deleteQuiz(id), {
    onSuccess: () => {
      // TODO: add optimistic update
      queryClient.invalidateQueries('quizzes');
    },
  });
};
