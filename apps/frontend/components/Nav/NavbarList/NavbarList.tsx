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
      href: '/signin',
      icon: <Key size={size} weight={weight} />,
      color: 'grey-dark',
    },
    {
      label: 'Dashboard',
      href: '/',
      icon: <SquaresFour size={size} weight={weight} />,
      color: 'grey-dark',
    },
    {
      label: 'Explore',
      href: '/explore',
      icon: <Binoculars size={size} weight={weight} />,
      color: 'grey-dark',
    },
    {
      label: 'Events',
      href: '/events',
      icon: <Confetti size={size} weight={weight} />,
      color: 'grey-dark',
    },
    {
      label: 'Quizzes',
      href: '/quiz',
      icon: <Queue size={size} weight={weight} />,
      color: 'grey-dark',
    },
    {
      label: 'Question packs',
      href: '/question-packs',
      icon: <Cube size={size} weight={weight} />,
      color: 'grey-dark',
    },
    {
      label: 'Teams',
      href: '/teams',
      icon: <UsersThree size={size} weight={weight} />,
      color: 'grey-dark',
    },
    {
      label: 'Stats',
      href: '/stats',
      icon: <PresentationChart size={size} weight={weight} />,
      color: 'grey-dark',
    },
    {
      label: 'Leaderboard',
      href: '/learderboard',
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
