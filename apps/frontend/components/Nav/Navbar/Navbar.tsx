import { Navbar as MantineNavbar } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { ThinScrollArea } from 'components/UI/ThinScrollArea';
import { useCurrentSession } from 'hooks/session';
import React from 'react';

import { NavbarDivider } from '../NavbarDivider';
import { NavbarHeader } from '../NavbarHeader/NavbarHeader';
import { NavbarList } from '../NavbarList/NavbarList';
import { NavbarUserMenu } from '../NavbarUser/NavbarUserMenu';

type Props = {
  opened: boolean;
};

export const Navbar = ({ opened }: Props) => {
  const { user } = useCurrentSession();
  const matches = useMediaQuery('(max-width: 576px)');

  return (
    <MantineNavbar
      hiddenBreakpoint="xs"
      hidden={!opened}
      padding="md"
      width={{ base: '100%', xs: 320 }}
      fixed
      height={matches ? 'calc(100vh - 60px)' : '100vh'}
      mt={matches ? 60 : 0}
    >
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
