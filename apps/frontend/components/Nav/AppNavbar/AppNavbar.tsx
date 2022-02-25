import { Avatar, Group, Navbar, ScrollArea, Text, UnstyledButton } from '@mantine/core';
import React from 'react';

import NavbarDivider from '../NavbarDivider';
import NavbarHeader from '../NavbarHeader/NavbarHeader';
import Navbarlist from '../NavbarList/NavbarList';

export const AppNavbar = (props) => {
  return (
    <Navbar padding="md" width={{ base: 320 }}>
      <Navbar.Section className="bg">
        <NavbarHeader />
      </Navbar.Section>
      <NavbarDivider />
      <Navbar.Section grow component={ScrollArea}>
        <Navbarlist />
      </Navbar.Section>
      <NavbarDivider />
      <Navbar.Section style={{ display: 'flex', alignItems: 'center' }}>
        <UnstyledButton
          sx={(t) => ({
            paddingTop: '1rem',
          })}
        >
          <Group>
            <Avatar size={34} color="teal">
              MO
            </Avatar>
            <div>
              <Text size="sm">Matija Handsome</Text>
              <Text size="xs" color="gray">
                matija@handsome.inc
              </Text>
            </div>
          </Group>
        </UnstyledButton>
      </Navbar.Section>
    </Navbar>
  );
};
