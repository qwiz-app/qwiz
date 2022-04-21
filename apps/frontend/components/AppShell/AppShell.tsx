import {
  AppShell as MantineAppShell,
  Burger,
  Container,
  Group,
  Header as MantineHeader,
  Navbar as MantineNavbar,
} from '@mantine/core';
import LogoDark from 'assets/logo/qwiz-dark.svg';
import LogoWhite from 'assets/logo/qwiz-white.svg';
import { NavbarDivider } from 'components/Nav/NavbarDivider';
import { NavbarHeader } from 'components/Nav/NavbarHeader/NavbarHeader';
import { NavbarList } from 'components/Nav/NavbarList/NavbarList';
import { NavbarUserMenu } from 'components/Nav/NavbarUser/NavbarUserMenu';
import { ThemeToggle } from 'components/UI/ThemeToggle';
import { ThinScrollArea } from 'components/UI/ThinScrollArea';
import { useBreakpoints } from 'hooks/breakpoints';
import { useAppColorscheme } from 'hooks/colorscheme';
import { useCurrentSession } from 'hooks/session';
import Image from 'next/image';
import { useState } from 'react';

export const AppShell = ({ children }) => {
  const { isDark } = useAppColorscheme();
  const [opened, setOpened] = useState(false);
  const { user } = useCurrentSession();
  const { matches } = useBreakpoints();

  const toggleNavbar = () => setOpened((prev) => !prev);

  const logo = isDark ? LogoWhite : LogoDark;

  const Navbar = (
    <MantineNavbar
      hiddenBreakpoint="xs"
      hidden={!opened}
      p="md"
      width={{ base: '100%', xs: 320 }}
      fixed
    >
      {!matches.max.xs && (
        <MantineNavbar.Section>
          <NavbarHeader />
        </MantineNavbar.Section>
      )}
      <MantineNavbar.Section grow component={ThinScrollArea} mt={8}>
        <NavbarList />
      </MantineNavbar.Section>
      <>
        <NavbarDivider />
        <MantineNavbar.Section mt={12}>
          {user ? <NavbarUserMenu.Account /> : <NavbarUserMenu.Guest />}
        </MantineNavbar.Section>
      </>
    </MantineNavbar>
  );

  // TODO: for now, Navbar and Header cant be custom components for Mantine to do its magic
  // TODO: find a way to extract them into their own components
  const Header = (
    <MantineHeader height={60} p="sm" fixed px={20}>
      <Group
        align="center"
        position="apart"
        sx={(t) => ({ width: '100%', height: '100%' })}
      >
        <Burger opened={opened} onClick={toggleNavbar} size="sm" />
        <Image
          src={logo}
          alt="logo"
          objectFit="contain"
          className="auth-logo"
          width={36}
          height={36}
        />
        <ThemeToggle />
      </Group>
    </MantineHeader>
  );

  return (
    <MantineAppShell
      navbarOffsetBreakpoint="xs"
      navbar={Navbar}
      fixed
      sx={(t) => ({
        backgroundColor: isDark ? t.colors.dark[8] : t.colors.gray[0],
        minHeight: '100vh',
      })}
      header={matches.max.xs && Header}
    >
      <Container fluid>{children}</Container>
    </MantineAppShell>
  );
};
