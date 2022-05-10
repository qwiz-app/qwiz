import { onError } from 'lib/axios';
import { useQuery } from 'react-query';
import { fetchCurrentUser, fetchUser, fetchUsers } from 'services/api/users';

export const useUsers = () =>
  useQuery(['users'], fetchUsers, {
    onError,
  });

export const useUser = (id: string) =>
  useQuery(['user', id], ({ queryKey }) => fetchUser(queryKey[1]), {
    onError,
    enabled: !!id,
  });

export const useCurrentUserInfo = () =>
  useQuery(['currentUser'], fetchCurrentUser, {
    onError,
  });
