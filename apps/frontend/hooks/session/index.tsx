import { useSession, UseSessionOptions } from 'next-auth/react';

export const useCurrentUser = () => useSession()?.data?.user ?? null;

export const useCurrentSession = <R extends boolean>(
  options?: UseSessionOptions<R>
) => {
  const session = useSession(options);

  const isAuthenticated = session.status === 'authenticated';
  const isUnauthenticated = session.status === 'unauthenticated';
  const isLoading = session.status === 'loading';

  return {
    user: session.data?.user,
    status: session.status,
    isAuthenticated,
    isUnauthenticated,
    isLoading,
  };
};
