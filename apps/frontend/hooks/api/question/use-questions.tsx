import { useQuery } from 'react-query';
import {
  fetchAllQuestions,
  fetchAvailableQuestions,
  fetchQuestionsByMe,
} from 'services/api/questions';

export const useAvailableQuestions = (enabled = true) =>
  useQuery('questions', fetchAvailableQuestions, {
    enabled,
  });

export const useMyQuestions = (enabled = true) =>
  useQuery('questionsByMe', fetchQuestionsByMe, {
    enabled,
  });

export const useAllQuestions = (enabled = true) =>
  useQuery('questionsAll', fetchAllQuestions, {
    enabled,
  });
