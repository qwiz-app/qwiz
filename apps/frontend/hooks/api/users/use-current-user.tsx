import { Role } from '@prisma/client';
import { onError } from 'lib/axios';
import { useQuery } from 'react-query';
import { fetchCurrentUser } from 'services/api/users';
import { useCurrentSession } from '../session';

export const useCurrentUser = () => {
  const {
    isAuthenticated,
    isUnauthenticated,
    isLoading: isSessionLoading,
  } = useCurrentSession();

  const query = useQuery(['currentUser'], fetchCurrentUser, {
    enabled: isAuthenticated,
    onError,
  });

  const user = query.data;

  const isAdmin = isAuthenticated && user?.role === Role.ADMIN;
  const isOrganization = isAuthenticated && user?.role === Role.ORGANIZATION;
  const isUser = isAuthenticated && user?.role === Role.ATTENDEE;

  return {
    ...query,
    isSessionLoading,
    user,
    isAuthenticated,
    isUnauthenticated,
    isOrganization,
    isAdmin,
    isUser,
  };
};
