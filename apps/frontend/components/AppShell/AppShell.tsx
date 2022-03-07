import {
  AppShell as MantineAppShell,
  Burger,
  Container,
  Group,
  Header as MantineHeader,
  Navbar as MantineNavbar,
  Text,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { NavbarDivider } from 'components/Nav/NavbarDivider';
import { NavbarHeader } from 'components/Nav/NavbarHeader/NavbarHeader';
import { NavbarList } from 'components/Nav/NavbarList/NavbarList';
import { NavbarUserMenu } from 'components/Nav/NavbarUser/NavbarUserMenu';
import { ThemeToggle } from 'components/UI/ThemeToggle';
import { ThinScrollArea } from 'components/UI/ThinScrollArea';
import { useAppColorscheme } from 'hooks/colorscheme';
import { useCurrentSession } from 'hooks/session';
import React, { useState } from 'react';

export const AppShell = ({ children }) => {
  const { isDark } = useAppColorscheme();
  const matches = useMediaQuery('(max-width: 576px)');
  const { user } = useCurrentSession();

  const [opened, setOpened] = useState(false);

  const toggleNavbar = () => {
    setOpened((op) => !op);
  };

  return (
    <MantineAppShell
      navbarOffsetBreakpoint="xs"
      // TODO: for now, Navbar and Header have to be inline for Mantine to do its magic
      // TODO: find a way to extract them into their own components
      navbar={
        <MantineNavbar
          hiddenBreakpoint="xs"
          hidden={!opened}
          padding="md"
          width={{ base: '100%', xs: 320 }}
          fixed
        >
          {!matches && (
            <>
              <MantineNavbar.Section>
                <NavbarHeader />
              </MantineNavbar.Section>
              <NavbarDivider />
            </>
          )}
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
      }
      fixed
      sx={(t) => ({
        backgroundColor: isDark ? t.colors.dark[8] : t.colors.gray[0],
        minHeight: '100vh',
      })}
      header={
        matches ? (
          <MantineHeader
            height={60}
            padding="sm"
            fixed
            sx={(t) => ({ paddingLeft: 20, paddingRight: 20 })}
          >
            <Group
              align="center"
              position="apart"
              sx={(t) => ({ width: '100%', height: '100%' })}
            >
              <Burger opened={opened} onClick={toggleNavbar} size="sm" />

              {/* TODO: extract LogoText into reusable component */}
              <Text
                transform="uppercase"
                size="xl"
                weight={400}
                sx={(t) => ({ fontFamily: t.fontFamilyMonospace })}
              >
                QWIZ
              </Text>
              <ThemeToggle />
            </Group>
          </MantineHeader>
        ) : null
      }
    >
      <Container fluid>{children}</Container>
    </MantineAppShell>
  );
};
