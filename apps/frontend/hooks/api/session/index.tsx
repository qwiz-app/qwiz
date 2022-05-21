import { Role } from '@prisma/client';
import { useSession, UseSessionOptions } from 'next-auth/react';

export const useCurrentSession = <R extends boolean>(
  options?: UseSessionOptions<R>
) => {
  const session = useSession(options);

  const isAuthenticated = session.status === 'authenticated';
  const isUnauthenticated = session.status === 'unauthenticated';
  const isLoading = session.status === 'loading';

  const isAdmin = isAuthenticated && session.data?.user.role === Role.ADMIN;
  const isUser = isAuthenticated && session.data?.user.role === Role.ATTENDEE;
  const isOrganization =
    isAuthenticated && session.data?.user.role === Role.ORGANIZATION;

  return {
    user: session.data?.user,
    status: session.status,
    isAuthenticated,
    isUnauthenticated,
    isLoading,
    isAdmin,
    isUser,
    isOrganization,
  };
};
