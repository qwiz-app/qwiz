import { useQuery } from 'react-query';
import {
  fetchAllQuestions,
  fetchAvailableQuestions,
  fetchQuestionsByMe,
} from 'services/api/questions';

export const useAvailableQuestions = () =>
  useQuery('questions', fetchAvailableQuestions);

export const useMyQuestions = (isOrg = true) =>
  useQuery('questionsByMe', fetchQuestionsByMe, {
    enabled: isOrg,
  });

export const useAllQuestions = () => useQuery('questions', fetchAllQuestions);
