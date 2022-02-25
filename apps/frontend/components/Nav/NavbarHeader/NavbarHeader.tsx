import { Group } from '@mantine/core';
import ThemeToggle from 'components/UI/ThemeToggle';
import React from 'react';

import NavbarLogo from '../NavbarLogo';

const NavbarHeader = (props) => {
  return (
    <Group
      sx={() => ({
        padding: '0 .5rem 1rem',
        gap: '.rem',
      })}
      position="apart"
    >
      <NavbarLogo />
      <ThemeToggle />
    </Group>
  );
};

export default NavbarHeader;
