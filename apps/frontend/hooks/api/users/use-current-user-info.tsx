import { onError } from 'lib/axios';
import { useQuery } from 'react-query';
import { fetchCurrentUser } from 'services/api/users';
import { useCurrentSession } from '../session';

export const useCurrentUserInfo = () => {
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
    isAuthenticated,
    isUnauthenticated,
    isOrganization,
    isAdmin,
    isUser,
  };
};
