import { Button, Divider, Menu } from '@mantine/core';
import { useBreakpoints } from 'hooks/breakpoints';
import { signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
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
        icon={<User weight="duotone" />}
        onClick={() => router.push('/profile')}
      >
        Profile
      </Menu.Item>
      <Menu.Item icon={<Gear weight="duotone" />}>Settings</Menu.Item>
      <Divider />
      <Menu.Label>Caution</Menu.Label>
      <Menu.Item
        color="red"
        icon={<SignOut weight="duotone" />}
        onClick={signOutHandler}
      >
        Sign out
      </Menu.Item>
      <Menu.Item color="red" icon={<Trash weight="duotone" />}>
        Delete my account
      </Menu.Item>
    </Menu>
  );
};

const Guest = () => {
  return (
    <Button
      onClick={() => signIn()}
      variant="outline"
      leftIcon={<SignIn size={14} />}
      fullWidth
    >
      Sign in
    </Button>
  );
};

export const NavbarUserMenu = {
  Account,
  Guest,
}