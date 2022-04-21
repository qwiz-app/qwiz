import { Group, Stack } from '@mantine/core';
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
import { NavbarItem, NavbarItemModel } from '../NavbarItem/NavbarItem';
import NavSearchItem from '../NavSearchItem';

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

  return (
    <Group direction="column" align="stretch" spacing={0} mb={12}>
      <NavSearchItem icon={<MagnifyingGlass {...iconProps} />} />
      <Stack spacing={2}>
        {items.map((item, i) => (
          <NavbarItem key={`navbar-item-${i}`} {...item} />
        ))}
      </Stack>
    </Group>
  );
};
