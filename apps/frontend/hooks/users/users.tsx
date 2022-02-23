import { queryOnError as onError } from 'lib/axios';
import { useQuery } from 'react-query';
import { fetchUser, fetchUsers } from 'services/api/users';

export const useUsers = () =>
  useQuery(['users'], fetchUsers, {
    onError,
  });

export const useUser = (id: string) =>
  useQuery(['user', id], ({ queryKey }) => fetchUser(queryKey[1]), {
    onError,
    enabled: !!id,
  });
