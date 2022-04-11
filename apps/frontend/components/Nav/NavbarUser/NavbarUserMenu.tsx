import { Divider, Menu } from '@mantine/core';
import { useBreakpoints } from 'hooks/breakpoints';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Gear, SignOut, Trash, User } from 'phosphor-react';
import NavbarUserButton from './NavbarUserButton';

export const NavbarUserMenu = () => {
  const signOutHandler = () => signOut();

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
