import { useMutation, useQueryClient } from 'react-query';
import { deleteQuestion } from 'services/api/questions';
import { QuestionWithContentAndCategoriesAndMode } from 'types/api/question';

export const useQuestionDelete = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation(() => deleteQuestion(id), {
    onMutate: async () => {
      await queryClient.cancelQueries(['questionsByMe']);
      await queryClient.cancelQueries(['questions']);

      const previousQuestionsByMe = queryClient.getQueryData(
        'questionsByMe'
      ) as QuestionWithContentAndCategoriesAndMode[];

      queryClient.setQueryData(
        'questionsByMe',
        previousQuestionsByMe?.filter((question) => question.id !== id) ?? []
      );

      const previousQuestions = queryClient.getQueryData(
        'questions'
      ) as QuestionWithContentAndCategoriesAndMode[];

      queryClient.setQueryData(
        'questions',
        previousQuestions?.filter((question) => question.id !== id) ?? []
      );

      return { previousQuestionsByMe, previousQuestions };
    },
    onError(
      err,
      variables,
      context: {
        previousQuestionsByMe: QuestionWithContentAndCategoriesAndMode[];
        previousQuestions: QuestionWithContentAndCategoriesAndMode[];
      }
    ) {
      if (context?.previousQuestionsByMe) {
        queryClient.setQueryData<QuestionWithContentAndCategoriesAndMode[]>(
          'questionsByMe',
          context.previousQuestions
        );
      }
      if (context?.previousQuestions) {
        queryClient.setQueryData<QuestionWithContentAndCategoriesAndMode[]>(
          'questionsByMe',
          context.previousQuestions
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('questions');
      queryClient.invalidateQueries('questionsByMe');
      queryClient.invalidateQueries('questionsAll');
    },
  });
};
