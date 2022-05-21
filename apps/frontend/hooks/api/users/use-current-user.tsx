import { onError } from 'lib/axios';
import { useQuery } from 'react-query';
import { fetchCurrentUser } from 'services/api/users';
import { useCurrentSession } from '../session';

export const useCurrentUser = () => {
  const {
    isAuthenticated,
    isUnauthenticated,
    isOrganization,
    isAdmin,
    isUser,
  } = useCurrentSession();

  const query = useQuery(['currentUser'], fetchCurrentUser, {
    enabled: isAuthenticated,
    onError,
  });

  return {
    ...query,
    user: query?.data,
    isAuthenticated,
    isUnauthenticated,
    isOrganization,
    isAdmin,
    isUser,
  };
};
