import { useQuery } from 'react-query';
import {
  fetchAllQuestions,
  fetchAvailableQuestions,
} from 'services/api/questions';

export const useAvailableQuestions = () =>
  useQuery('questions', fetchAvailableQuestions);

export const useAllQuestions = () => useQuery('questions', fetchAllQuestions);
