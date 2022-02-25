import { Navbar } from '@mantine/core';
import { ThinScrollArea } from 'components/UI/ThinScrollArea';
import { useCurrentSession } from 'hooks/session';
import React from 'react';
import { NavbarDivider } from '../NavbarDivider';
import { NavbarHeader } from '../NavbarHeader/NavbarHeader';
import { NavbarList } from '../NavbarList/NavbarList';

import { NavbarUser } from '../NavbarUser';

export const AppNavbar = (props) => {
  const { user, isLoading } = useCurrentSession();

  return (
    <Navbar padding="md" width={{ base: 320 }}>
      <Navbar.Section className="bg">
        <NavbarHeader />
      </Navbar.Section>
      <NavbarDivider />
      <Navbar.Section
        grow
        component={ThinScrollArea}
        ml={-16}
        mr={-16}
        sx={{ paddingLeft: 16, paddingRight: 16 }}
      >
        <NavbarList />
      </Navbar.Section>
      {user && !isLoading && (
        <>
          <NavbarDivider />
          <Navbar.Section mt=".75rem">
            <NavbarUser />
          </Navbar.Section>
        </>
      )}
    </Navbar>
  );
};
