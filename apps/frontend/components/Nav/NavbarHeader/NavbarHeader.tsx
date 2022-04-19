import { Group } from '@mantine/core';
import { ThemeToggle } from 'components/UI/ThemeToggle';
import React from 'react';
import { NavbarLogo } from '../NavbarLogo';

export const NavbarHeader = () => {
  return (
    <Group mb={12} mx={8} position="apart">
      <NavbarLogo />
      <ThemeToggle tooltipPosition="left" />
    </Group>
  );
};
