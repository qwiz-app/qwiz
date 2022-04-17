import { Group } from '@mantine/core';
import {
  Binoculars,
  Confetti,
  Cube,
  IconProps,
  PresentationChart,
  Queue,
  SquaresFour,
  Trophy,
  UsersThree,
} from 'phosphor-react';
import { paths } from 'paths';
// eslint-disable-next-line import/no-cycle
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
      color: 'grey-dark',
    },
    {
      label: 'Explore',
      href: paths.explore(),
      icon: <Binoculars {...iconProps} />,
      color: 'grey-dark',
    },
    {
      label: 'Events',
      href: paths.events(),
      icon: <Confetti {...iconProps} />,
      color: 'grey-dark',
    },
    {
      label: 'Quizzes',
      href: paths.quiz(),
      icon: <Queue {...iconProps} />,
      color: 'grey-dark',
    },
    {
      label: 'Question packs',
      href: paths.questionPacks(),
      icon: <Cube {...iconProps} />,
      color: 'grey-dark',
    },
    {
      label: 'Teams',
      href: paths.teams(),
      icon: <UsersThree {...iconProps} />,
      color: 'grey-dark',
    },
    {
      label: 'Stats',
      href: paths.stats(),
      icon: <PresentationChart {...iconProps} />,
      color: 'grey-dark',
    },
    {
      label: 'Leaderboard',
      href: paths.leaderboard(),
      icon: <Trophy {...iconProps} />,
      color: 'grey-dark',
    },
  ];

  return (
    <Group direction="column" align="stretch" spacing={0} mb={12}>
      {items.map((item, i) => (
        <NavbarItem key={`navbar-item-${i}`} {...item} />
      ))}
    </Group>
  );
};
