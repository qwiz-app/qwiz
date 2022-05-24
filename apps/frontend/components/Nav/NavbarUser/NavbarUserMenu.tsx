import { Button, Divider, Menu } from '@mantine/core';
import { useCurrentUserDelete } from 'hooks/api/users';
import { useBreakpoints } from 'hooks/breakpoints';
import { useDeleteConfirmModal } from 'hooks/use-delete-confirm-modal';
import { useSignOut } from 'hooks/use-sign-out';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { paths } from 'paths';
import { Gear, SignIn, SignOut, Trash, User } from 'phosphor-react';
import NavbarUserButton from './NavbarUserButton';

const Account = () => {
  const router = useRouter();
  const { matches } = useBreakpoints();
  const { mutate: deleteUser } = useCurrentUserDelete();
  const { signOutUser } = useSignOut();

  const userDeleteHandler = useDeleteConfirmModal({
    onConfirm: () => {
      deleteUser();
      router.push(paths.signIn());
    },
    message: 'Are you sure you want to delete your account?',
    confirmLabel: 'Delete my account',
    cancelLabel: 'Cancel',
    title: 'Delete your profile',
  });

  return (
    <Menu
      trigger="click"
      position={matches.max.xs ? 'top' : 'right'}
      control={<NavbarUserButton />}
      sx={() => ({ width: '100%' })}
    >
      <Menu.Label>Application</Menu.Label>
      <Menu.Item
        icon={<User weight="bold" />}
        onClick={() => router.push(paths.profile())}
      >
        Profile
      </Menu.Item>
      <Menu.Item icon={<Gear weight="bold" />}>Settings</Menu.Item>
      <Divider />
      <Menu.Label>Danger zone</Menu.Label>
      <Menu.Item
        color="red"
        icon={<SignOut weight="bold" />}
        onClick={signOutUser}
      >
        Sign out
      </Menu.Item>
      <Menu.Item
        color="red"
        icon={<Trash weight="bold" />}
        onClick={userDeleteHandler}
      >
        Delete my account
      </Menu.Item>
    </Menu>
  );
};

const Guest = () => {
  return (
    <Button
      onClick={() => signIn()}
      variant="filled"
      color="primary"
      leftIcon={<SignIn weight="bold" />}
      fullWidth
      size="md"
    >
      Sign in
    </Button>
  );
};

export const NavbarUserMenu = {
  Account,
  Guest,
};
