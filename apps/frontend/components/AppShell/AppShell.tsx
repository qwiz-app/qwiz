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
import { NavbarItemModel } from 'components/Nav/NavbarItem/NavbarItem';
import { NavbarList } from 'components/Nav/NavbarList/NavbarList';
import { NavbarUserMenu } from 'components/Nav/NavbarUser/NavbarUserMenu';
import NavSearchItem from 'components/Nav/NavSearchItem';
import { ThemeToggle } from 'components/UI/ThemeToggle';
import { ThinScrollArea } from 'components/UI/ThinScrollArea';
import { useCurrentSession } from 'hooks/api/session';
import { useBreakpoints } from 'hooks/breakpoints';
import { useAppColorscheme } from 'hooks/colorscheme';
import Image from 'next/image';
import { paths } from 'paths';
import {
  Binoculars,
  Confetti,
  Cube,
  IconProps,
  MagnifyingGlass,
  PresentationChart,
  Queue,
  SquaresFour,
  Trophy,
  UsersThree,
} from 'phosphor-react';
import { useState } from 'react';

export const AppShell = ({ children }) => {
  const { isDark } = useAppColorscheme();
  const [opened, setOpened] = useState(false);
  const { isAuthenticated, isLoading } = useCurrentSession();
  const { matches } = useBreakpoints();

  const toggleNavbar = () => setOpened((prev) => !prev);

  const logo = isDark ? LogoWhite : LogoDark;

  const iconProps: IconProps = {
    size: 20,
    weight: 'duotone',
  };
  const items: NavbarItemModel[] = [
    {
      label: 'Dashboard',
      href: paths.home(),
      icon: <SquaresFour {...iconProps} />,
    },
    {
      label: 'Explore',
      href: paths.explore(),
      icon: <Binoculars {...iconProps} />,
    },
    {
      label: 'Events',
      href: paths.events(),
      icon: <Confetti {...iconProps} />,
    },
    {
      label: 'Quizzes',
      href: paths.quiz(),
      icon: <Queue {...iconProps} />,
    },
    {
      label: 'Question packs',
      href: paths.questionPacks(),
      icon: <Cube {...iconProps} />,
    },
    {
      label: 'Teams',
      href: paths.teams(),
      icon: <UsersThree {...iconProps} />,
    },
    {
      label: 'Stats',
      href: paths.stats(),
      icon: <PresentationChart {...iconProps} />,
    },
    {
      label: 'Leaderboard',
      href: paths.leaderboard(),
      icon: <Trophy {...iconProps} />,
    },
  ];

  // TODO: fix navbar height on mobile
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
