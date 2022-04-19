import { Group } from '@mantine/core';
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
// eslint-disable-next-line import/no-cycle
import { useSpotlight } from '@mantine/spotlight';
import KbdShortcut from 'components/UI/KbdShortcut';
import { NavbarItem, NavbarItemModel } from '../NavbarItem/NavbarItem';

export const NavbarList = () => {
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

  const { openSpotlight } = useSpotlight();

  const searchNavItem = (
    <NavbarItem
      icon={<MagnifyingGlass {...iconProps} />}
      onClick={openSpotlight}
    >
      <Group spacing={8} position="apart" sx={(t) => ({ flex: 1 })}>
        <span>Search</span>
        <KbdShortcut keys={['Ctrl', 'K']} />
      </Group>
    </NavbarItem>
  );

  return (
    <Group direction="column" align="stretch" spacing={0} mb={12}>
      {searchNavItem}
      <Group direction="column" align="stretch" spacing={0}>
        {items.map((item, i) => (
          <NavbarItem key={`navbar-item-${i}`} {...item} />
        ))}
      </Group>
    </Group>
  );
};
