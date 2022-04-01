import { Divider, Menu } from '@mantine/core';
import { signOut } from 'next-auth/react';
import { Gear, SignOut, Trash, User, UserSwitch } from 'phosphor-react';
import React from 'react';

import NavbarUserButton from './NavbarUserButton';

export const NavbarUserMenu = () => {
  const signOutHandler = async () => {
    await signOut({
      callbackUrl: '/signin?signOut=true',
    });
  };

  return (
    <Menu
      trigger="click"
      position="right"
      control={<NavbarUserButton />}
      sx={() => ({ width: '100%' })}
    >
      <Menu.Label>Application</Menu.Label>
      <Menu.Item icon={<User weight="duotone" />}>Profile</Menu.Item>
      <Menu.Item icon={<Gear weight="duotone" />}>Settings</Menu.Item>
      <Menu.Item icon={<UserSwitch weight="duotone" />}>Switch user</Menu.Item>
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
