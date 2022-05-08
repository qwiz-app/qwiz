import { useCurrentSession } from 'hooks/api/session';
import { useEffect } from 'react';
import cookieCutter from 'cookie-cutter';

export const RoleGuard = ({ children }) => {
  const { user } = useCurrentSession();

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
