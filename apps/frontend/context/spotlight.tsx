import type { SpotlightAction } from '@mantine/spotlight';
import { SpotlightProvider } from '@mantine/spotlight';
import { useAppColorscheme } from 'hooks/colorscheme';
import { useProviders } from 'hooks/providers';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import {
  DiscordLogo,
  FileText,
  GithubLogo,
  GoogleLogo,
  MagnifyingGlass,
  Moon,
  SignIn,
  SignOut,
  SquaresFour,
  Sun,
} from 'phosphor-react';

const useSpotlightActions = () => {
  const router = useRouter();
  const { toggleColorScheme, isDark } = useAppColorscheme();

  const { signInWithProvider } = useProviders();

  // TODO: configure showing auth vs non-auth options
  const actions: SpotlightAction[] = [
    {
      title: 'Switch theme',
      description: `Switch to ${isDark ? 'light' : 'dark'} mode`,
      group: 'actions',
      onTrigger: () => toggleColorScheme(),
      icon: isDark ? (
        <Sun size={24} weight="duotone" />
      ) : (
        <Moon size={24} weight="duotone" />
      ),
      keywords: ['theme', 'mode', 'dark', 'light', 'toggle'],
    },
    {
      title: 'Sign in',
      description: 'Sign in to your account',
      group: 'actions',
      onTrigger: () => router.push('/signin'),
      icon: <SignIn size={24} weight="duotone" />,
      keywords: ['login', 'auth'],
    },
    {
      title: 'Sign out',
      description: 'Sign out of your account',
      group: 'actions',
      onTrigger: () =>
        signOut({
          callbackUrl: '/signin?signOut=true',
        }),
      icon: <SignOut size={24} weight="duotone" />,
      keywords: ['logout', 'log out', 'signout'],
    },
    {
      title: 'Dashboard',
      group: 'main',
      description: 'Go to your dashboard',
      onTrigger: () => router.push('/'),
      icon: <SquaresFour size={24} weight="duotone" />,
      keywords: ['home'],
    },
    {
      title: 'Documentation',
      group: 'main',
      description: 'Visit documentation to lean more about all features',
      onTrigger: () => console.log('Documentation'),
      icon: <FileText size={24} weight="duotone" />,
    },
    {
      title: 'Sign in with Google',
      group: 'auth',
      description: 'Sign in with your Google account',
      onTrigger: () => signInWithProvider('google', '/'),
      icon: <GoogleLogo size={24} weight="duotone" />,
    },
    {
      title: 'Sign in with Github',
      group: 'auth',
      description: 'Sign in with your Github account',
      onTrigger: () => signInWithProvider('github', '/'),
      icon: <GithubLogo size={24} weight="duotone" />,
    },
    {
      title: 'Sign in with Discord',
      group: 'auth',
      description: 'Sign in with your Discord account',
      onTrigger: () => signInWithProvider('discord', '/'),
      icon: <DiscordLogo size={24} weight="duotone" />,
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
      styles={{
        root: {
          padding: '0.5rem',
        },
      }}
    >
      {children}
    </SpotlightProvider>
  );
};
