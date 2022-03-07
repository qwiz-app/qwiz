import { Navbar as MantineNavbar } from '@mantine/core';
import { ThinScrollArea } from 'components/UI/ThinScrollArea';
import { useCurrentSession } from 'hooks/session';
import React from 'react';

import { NavbarDivider } from '../NavbarDivider';
import { NavbarHeader } from '../NavbarHeader/NavbarHeader';
import { NavbarList } from '../NavbarList/NavbarList';
import { NavbarUserMenu } from '../NavbarUser/NavbarUserMenu';

export const Navbar = () => {
  const { user } = useCurrentSession();

  return (
    <MantineNavbar padding="md" width={{ base: 320 }}>
      <MantineNavbar.Section className="bg">
        <NavbarHeader />
      </MantineNavbar.Section>
      <NavbarDivider />
      <MantineNavbar.Section
        grow
        component={ThinScrollArea}
        ml={-16}
        mr={-16}
        sx={{ paddingLeft: 16, paddingRight: 16 }}
      >
        <NavbarList />
      </MantineNavbar.Section>
      {user && (
        <>
          <NavbarDivider />
          <MantineNavbar.Section mt={12}>
            <NavbarUserMenu />
          </MantineNavbar.Section>
        </>
      )}
    </MantineNavbar>
  );
};
