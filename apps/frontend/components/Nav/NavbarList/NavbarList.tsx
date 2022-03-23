import { Group } from '@mantine/core';
import {
  Balloon,
  Cookie,
  IconProps,
  Key,
  PersonSimpleRun,
  Target,
  User,
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
      href: '/sign-in',
      icon: <Key size={size} weight={weight} />,
      color: 'grey-dark',
    },
    {
      label: 'Events',
      href: '/events',
      icon: <Balloon size={size} weight={weight} />,
      color: 'grey-dark',
    },
    {
      label: 'Quiz',
      href: '/quiz',
      icon: <Cookie size={size} weight={weight} />,
      color: 'grey-dark',
    },
    {
      label: 'Teams',
      href: '/teams',
      icon: <PersonSimpleRun size={size} weight={weight} />,
      color: 'grey-dark',
    },
    {
      label: 'Profile',
      href: '/profile',
      icon: <User size={size} weight={weight} />,
      color: 'grey-dark',
    },
    {
      label: 'Scoreboard',
      href: '/scoreboard',
      icon: <Target size={size} weight={weight} />,
      color: 'grey-dark',
    },
  ];

  return (
    <Group direction="column" align="stretch" spacing={0} mt={12} mb={12}>
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
