import { Button, Divider, Menu } from '@mantine/core';
import { useBreakpoints } from 'hooks/breakpoints';
import { signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { paths } from 'paths';
import { Gear, SignIn, SignOut, Trash, User } from 'phosphor-react';
import NavbarUserButton from './NavbarUserButton';

const Account = () => {
  const signOutHandler = () =>
    signOut({
      callbackUrl: '/signin?signOut=true',
    });

  const { matches } = useBreakpoints();
  const router = useRouter();

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
        onClick={signOutHandler}
      >
        Sign out
      </Menu.Item>
      <Menu.Item color="red" icon={<Trash weight="bold" />}>
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
