import {
  CircleDashed,
  FileText,
  HouseSimple,
  MagnifyingGlass,
  SignIn,
  SignOut,
} from 'phosphor-react';

import { SpotlightProvider } from '@mantine/spotlight';
import type { SpotlightAction } from '@mantine/spotlight';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

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
      description: 'Sign in!',
      onTrigger: () => router.push('/signin'),
      icon: <SignIn size={24} weight="duotone" />,
      keywords: ['login', 'auth'],
    },
    {
      title: 'Sign out',
      description: 'Sign yourself out',
      onTrigger: () =>
        signOut({
          callbackUrl: '/signin?signOut=true',
        }),
      icon: <SignOut size={24} weight="duotone" />,
      keywords: ['logout', 'log out'],
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
    // TODO: only allow toggling spotlight if logged in
    // or: only allow providers on spotlight for /signin page
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
