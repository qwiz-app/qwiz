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
import React, { useState } from 'react';
import { NavbarItem } from '../NavbarItem/NavbarItem';

type NavbarItemModel = {
  icon: React.ReactNode;
  label: string;
  href: string;
  color?: string;
};

export const NavbarList = (props) => {
  const [{ size, weight }] = useState<IconProps>({
    size: 20,
    weight: 'duotone',
  });
  const [items] = useState<NavbarItemModel[]>([
    {
      label: 'Sign in',
      href: '/sign-in',
      icon: <Key size={size} weight={weight} />,
      color: 'tailwind-teal',
    },
    {
      label: 'Events',
      href: '/events',
      icon: <Balloon size={size} weight={weight} />,
      color: 'tailwind-teal',
    },
    {
      label: 'Quiz',
      href: '/quiz',
      icon: <Cookie size={size} weight={weight} />,
      color: 'tailwind-teal',
    },
    {
      label: 'Teams',
      href: '/teams',
      icon: <PersonSimpleRun size={size} weight={weight} />,
      color: 'tailwind-teal',
    },
    {
      label: 'Profile',
      href: '/profile',
      icon: <User size={size} weight={weight} />,
      color: 'tailwind-teal',
    },
    {
      label: 'Scoreboard',
      href: '/scoreboard',
      icon: <Target size={size} weight={weight} />,
      color: 'tailwind-teal',
    },
  ]);

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
