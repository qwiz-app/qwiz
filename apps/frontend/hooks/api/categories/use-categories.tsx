import { useQuery } from 'react-query';
import { onError } from 'lib/axios';
import { fetchCategories } from 'services/api/categories';

export const useCategories = () =>
  useQuery('categories', fetchCategories, {
    onError,
  });
