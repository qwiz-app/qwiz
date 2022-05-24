import { showNotification } from '@mantine/notifications';
import { signOut } from 'next-auth/react';
import { paths } from 'paths';

export const useSignOut = () => {
  const showSignedOutNotification = () => {
    setTimeout(() => {
      showNotification({
        title: 'Signed out',
        message: 'You have been signed out.',
        color: 'green',
        autoClose: 6000,
      });
    }, 400);
  };

  const signOutUser = async () => {
    signOut({
      callbackUrl: paths.signOut(),
    });
  };

  return {
    signOutUser,
    showSignedOutNotification,
  };
};
