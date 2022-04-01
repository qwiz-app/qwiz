import {
  CircleDashed,
  FileText,
  HouseSimple,
  MagnifyingGlass,
  SignIn,
} from 'phosphor-react';

import { SpotlightProvider } from '@mantine/spotlight';
import type { SpotlightAction } from '@mantine/spotlight';
import { useRouter } from 'next/router';

const useSpotlightActions = () => {
  const router = useRouter();
  const actions: SpotlightAction[] = [
    {
      title: 'Home',
      description: 'Get to home page',
      onTrigger: () => router.push('/'),
      icon: <HouseSimple size={24} weight="duotone" />,
    },
    {
      title: 'Sign in',
      description: 'Sign yourself in!',
      onTrigger: () => router.push('/sign-in'),
      icon: <SignIn size={24} weight="duotone" />,
      keywords: ['login', 'auth'],
    },
    {
      title: 'Dashboard',
      description: 'Get full information about current system status',
      onTrigger: () => console.log('Dashboard'),
      icon: <CircleDashed size={24} weight="duotone" />,
    },
    {
      title: 'Documentation',
      description: 'Visit documentation to lean more about all features',
      onTrigger: () => console.log('Documentation'),
      icon: <FileText size={24} weight="duotone" />,
    },
  ];

  return actions;
};

export const CustomSpotlightProvider = ({ children }) => {
  const actions = useSpotlightActions();

  return (
    // TODO: add padding to spotlight (for mobile)
    <SpotlightProvider
      actions={actions}
      searchIcon={<MagnifyingGlass size={24} />}
      searchPlaceholder="Search..."
      shortcut={['mod + P', 'mod + K', '/']}
      nothingFoundMessage="Nothing found..."
      highlightQuery
      highlightColor="orange"
    >
      {children}
    </SpotlightProvider>
  );
};
