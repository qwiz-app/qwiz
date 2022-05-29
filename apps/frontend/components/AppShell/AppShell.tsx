import {
  AppShell as MantineAppShell,
  Burger,
  Container,
  Group,
  Header as MantineHeader,
  Navbar as MantineNavbar
} from '@mantine/core';
import LogoDark from 'assets/logo/qwiz-dark.svg';
import LogoWhite from 'assets/logo/qwiz-white.svg';
import { NavbarDivider } from 'components/Nav/NavbarDivider';
import { NavbarHeader } from 'components/Nav/NavbarHeader';
import { NavbarList } from 'components/Nav/NavbarList';
import { NavbarUserMenu } from 'components/Nav/NavbarUser/NavbarUserMenu';
import NavSearchItem from 'components/Nav/NavSearchItem';
import { ThemeToggle } from 'components/UI/ThemeToggle';
import { ThinScrollArea } from 'components/UI/ThinScrollArea';
import { useCurrentSession } from 'hooks/api/session';
import { useBreakpoints } from 'hooks/breakpoints';
import { useAppColorscheme } from 'hooks/colorscheme';
import { useNavItems } from 'hooks/use-nav-items';
import Image from 'next/image';
import { MagnifyingGlass } from 'phosphor-react';
import { useState } from 'react';

export const AppShell = ({ children }) => {
  const { isAuthenticated, isLoading } = useCurrentSession();
  const { isDark } = useAppColorscheme();
  const { matches } = useBreakpoints();
  const { items, iconProps } = useNavItems();

  const [opened, setOpened] = useState(false);
  const toggleNavbar = () => setOpened((prev) => !prev);

  const logo = isDark ? LogoWhite : LogoDark;

  // TODO: fix navbar height on mobile
  // TODO: close mobile drawer after action or navigating
  const Navbar = (
    <MantineNavbar
      hiddenBreakpoint="sm"
      hidden={!opened}
      p="md"
      width={{ base: '100%', sm: 260, md: 300, xl: 320 }}
      fixed
    >
      {!matches.max.sm && (
        <MantineNavbar.Section>
          <NavbarHeader />
        </MantineNavbar.Section>
      )}
      <MantineNavbar.Section mt={8}>
        <NavSearchItem icon={<MagnifyingGlass {...iconProps} />} />
      </MantineNavbar.Section>
      <MantineNavbar.Section
        grow
        component={ThinScrollArea}
        mt={16}
        mb={12}
        ml={-16}
        mr={-16}
        pl={16}
        pr={16}
      >
        <NavbarList items={items} />
      </MantineNavbar.Section>
      <>
        <NavbarDivider />
        <MantineNavbar.Section mt={12}>
          {isAuthenticated || isLoading ? (
            <NavbarUserMenu.Account />
          ) : (
            <NavbarUserMenu.Guest />
          )}
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
      navbarOffsetBreakpoint="sm"
      navbar={Navbar}
      fixed
      sx={(t) => ({
        backgroundColor: isDark ? t.colors.dark[8] : t.colors.gray[0],
        minHeight: '100vh',
      })}
      header={matches.max.sm && Header}
    >
      <Container fluid p={0}>
        {children}
      </Container>
    </MantineAppShell>
  );
};
