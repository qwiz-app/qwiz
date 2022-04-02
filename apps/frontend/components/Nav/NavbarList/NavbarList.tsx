import { Group } from '@mantine/core';
import {
  Binoculars,
  Confetti,
  Cube,
  IconProps,
  Key,
  PresentationChart,
  Queue,
  SquaresFour,
  Trophy,
  UsersThree,
} from 'phosphor-react';
import { ReactNode } from 'react';
import { paths } from 'paths';
import { NavbarItem } from '../NavbarItem/NavbarItem';

type NavbarItemModel = {
  icon: ReactNode;
  label: string;
  href: string;
  color?: string;
};

export const NavbarList = () => {
  const { size, weight }: IconProps = {
    size: 20,
    weight: 'duotone',
  };
  const items: NavbarItemModel[] = [
    {
      label: 'Sign in',
      href: paths.signIn(),
      icon: <Key size={size} weight={weight} />,
      color: 'grey-dark',
    },
    {
      label: 'Dashboard',
      href: paths.home(),
      icon: <SquaresFour size={size} weight={weight} />,
      color: 'grey-dark',
    },
    {
      label: 'Explore',
      href: paths.explore(),
      icon: <Binoculars size={size} weight={weight} />,
      color: 'grey-dark',
    },
    {
      label: 'Events',
      href: paths.events(),
      icon: <Confetti size={size} weight={weight} />,
      color: 'grey-dark',
    },
    {
      label: 'Quizzes',
      href: paths.quiz(),
      icon: <Queue size={size} weight={weight} />,
      color: 'grey-dark',
    },
    {
      label: 'Question packs',
      href: paths.questionPacks(),
      icon: <Cube size={size} weight={weight} />,
      color: 'grey-dark',
    },
    {
      label: 'Teams',
      href: paths.teams(),
      icon: <UsersThree size={size} weight={weight} />,
      color: 'grey-dark',
    },
    {
      label: 'Stats',
      href: paths.stats(),
      icon: <PresentationChart size={size} weight={weight} />,
      color: 'grey-dark',
    },
    {
      label: 'Leaderboard',
      href: paths.leaderboard(),
      icon: <Trophy size={size} weight={weight} />,
      color: 'grey-dark',
    },
  ];

  return (
    <Group direction="column" align="stretch" spacing={0} mb={12}>
      {items.map((item, i) => (
        <NavbarItem
          key={`navbar-item-${i}`}
          label={item.label}
          href={item.href}
          color={item.color}
          icon={item.icon}
        />
      ))}
    </Group>
  );
};
