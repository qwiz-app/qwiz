import { Prisma } from '@prisma/client';
import { useMutation, useQueryClient } from 'react-query';
import { updateQuestion } from 'services/api/questions';
import { QuestionWithContentAndCategoriesAndMode } from 'types/api/question';

export const useQuestionUpdate = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: Prisma.QuestionUncheckedUpdateInput) => updateQuestion(id, data),
    {
      onMutate: async (newQuestion) => {
        await queryClient.cancelQueries('questions');
        await queryClient.cancelQueries('questionsByMe');

        const previousQuestions = queryClient.getQueryData(
          'questions'
        ) as QuestionWithContentAndCategoriesAndMode[];
        const previousQuestionsByMe = queryClient.getQueryData(
          'questionsByMe'
        ) as QuestionWithContentAndCategoriesAndMode[];

        // Update list
        const updatedQuestions = previousQuestions?.map((q) =>
          q.id !== id ? q : { ...q, ...newQuestion }
        );
        const updatedQuestionsByMe = previousQuestionsByMe?.map((q) =>
          q.id !== id ? q : { ...q, ...newQuestion }
        );

        queryClient.setQueryData('questions', updatedQuestions);
        queryClient.setQueryData('questionsByMe', updatedQuestionsByMe);

        return {
          previousQuestions,
          previousQuestionsByMe,
        };
      },
      onError(
        err,
        variables,
        context: {
          previousQuestions: QuestionWithContentAndCategoriesAndMode[];
          previousQuestionsByMe: QuestionWithContentAndCategoriesAndMode[];
          previousQuestionsAll: QuestionWithContentAndCategoriesAndMode[];
        }
      ) {
        if (context?.previousQuestions) {
          queryClient.setQueryData<QuestionWithContentAndCategoriesAndMode[]>(
            'teams',
            context.previousQuestions
          );
        }
        if (context?.previousQuestionsByMe) {
          queryClient.setQueryData<QuestionWithContentAndCategoriesAndMode[]>(
            'teams',
            context.previousQuestionsByMe
          );
        }
      },

      onSettled: () => {
        queryClient.invalidateQueries(['questions']);
        queryClient.invalidateQueries(['questionsByMe']);
        queryClient.invalidateQueries(['questionsAll']);
      },
    }
  );
};
