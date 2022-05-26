import { Role } from '@prisma/client';
import { paths } from 'paths';
import {
  Binoculars,
  CircleWavyQuestion,
  Confetti,
  Cube,
  IconProps,
  PresentationChart,
  Queue,
  SquaresFour,
  Trophy,
  UsersThree,
} from 'phosphor-react';
import { useState } from 'react';
import { NavItemModel } from 'types/elements/nav-item';
import { useCurrentUser } from './api/users';

export const useNavItems = () => {
  const { user, isAuthenticated } = useCurrentUser();

  const iconProps: IconProps = {
    size: 20,
    weight: 'duotone',
  };

  const [ALL_ITEMS] = useState<NavItemModel[]>([
    {
      label: 'Dashboard',
      href: paths.home(),
      icon: <SquaresFour {...iconProps} />,
    },
    {
      label: 'Explore',
      href: paths.explore(),
      icon: <Binoculars {...iconProps} />,
      permissions: [Role.ATTENDEE],
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
      permissions: [Role.ORGANIZATION],
    },
    {
      label: 'Questions',
      href: paths.questions(),
      icon: <CircleWavyQuestion {...iconProps} />,
      permissions: [Role.ORGANIZATION],
    },
    {
      label: 'Question packs',
      href: paths.questionPacks(),
      icon: <Cube {...iconProps} />,
      permissions: [Role.ORGANIZATION],
    },
    {
      label: 'Teams',
      href: paths.teams(),
      icon: <UsersThree {...iconProps} />,
      permissions: [Role.ATTENDEE],
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
  ]);

  const items = ALL_ITEMS.filter((item) => {
    if (item.permissions) {
      return isAuthenticated && item.permissions.includes(user?.role);
    }
    return true;
  });

  return { items, iconProps };
};
