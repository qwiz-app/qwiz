import { useQuery } from 'react-query';
import {
  fetchAllQuestions,
  fetchAvailableQuestions,
  fetchQuestionsByMe,
} from 'services/api/questions';

export const useAvailableQuestions = () =>
  useQuery('questions', fetchAvailableQuestions);

export const useMyQuestions = () =>
  useQuery('questionsByMe', fetchQuestionsByMe);

export const useAllQuestions = () => useQuery('questions', fetchAllQuestions);
