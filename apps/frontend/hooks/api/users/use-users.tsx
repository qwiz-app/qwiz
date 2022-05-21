import { onError } from 'lib/axios';
import { useQuery } from 'react-query';
import { fetchUsers } from 'services/api/users';

export const useUsers = () =>
  useQuery(['users'], fetchUsers, {
    onError,
  });
