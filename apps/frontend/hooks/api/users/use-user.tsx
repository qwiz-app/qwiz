import { onError } from 'lib/axios';
import { useQuery } from 'react-query';
import { fetchUser } from 'services/api/users';

export const useUser = (id: string) =>
  useQuery(['user', id], ({ queryKey }) => fetchUser(queryKey[1]), {
    onError,
    enabled: !!id,
  });
