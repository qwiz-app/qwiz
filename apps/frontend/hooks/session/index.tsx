import { useSession, UseSessionOptions } from 'next-auth/react';

export const useCurrentUser = () => useSession()?.data?.user ?? null;

export const useCurrentSession = <R extends boolean>(
  options?: UseSessionOptions<R>
) => {
  const session = useSession(options);

  const isAuthenticated = session.status === 'authenticated';
  const isLoading = session.status === 'loading';

  return {
    ...session,
    user: session.data?.user,
    isAuthenticated,
    isLoading,
  };
};
