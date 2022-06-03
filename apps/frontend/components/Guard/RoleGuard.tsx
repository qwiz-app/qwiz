import cookieCutter from 'cookie-cutter';
import { useCurrentUser } from 'hooks/api/users';
import { useEffect } from 'react';

export const RoleGuard = ({ children }) => {
  const { user } = useCurrentUser();

  useEffect(() => {
    const role = cookieCutter.get('role');
    if (!role) {
      cookieCutter.set('role', user?.role);
    }
    if (role !== user?.role) {
      cookieCutter.set('role', user?.role);
    }
  }, [user?.role]);

  return children;
};
