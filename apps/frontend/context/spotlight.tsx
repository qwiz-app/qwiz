import type { SpotlightAction } from '@mantine/spotlight';
import { SpotlightProvider } from '@mantine/spotlight';
import { useCurrentSession } from 'hooks/api/session';
import { useAppColorscheme } from 'hooks/colorscheme';
import { useProviders } from 'hooks/providers';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { paths } from 'paths';
import {
  Binoculars,
  Confetti,
  DiscordLogo,
  FileText,
  GithubLogo,
  GoogleLogo,
  IconProps,
  MagnifyingGlass,
  Moon,
  Queue,
  SignIn,
  SignOut,
  SquaresFour,
  Sun,
} from 'phosphor-react';

const useSpotlightActions = () => {
  const router = useRouter();
  const { toggleColorScheme, isDark } = useAppColorscheme();
  const { isAuthenticated, isLoading } = useCurrentSession();
  const { signInWithProvider } = useProviders();

  const iconProps: IconProps = {
    size: 24,
    weight: 'duotone',
  };

  const routeActions: SpotlightAction[] = [
    {
      title: 'Dashboard',
      group: 'Navigate',
      description: 'Go to your dashboard',
      onTrigger: () => router.push(paths.home()),
      icon: <SquaresFour {...iconProps} />,
      keywords: ['home'],
    },
    {
      title: 'Explore',
      group: 'Navigate',
      description: 'Go to your explore page',
      onTrigger: () => router.push(paths.explore()),
      icon: <Binoculars {...iconProps} />,
    },
    {
      title: 'Events',
      group: 'Navigate',
      description: 'Go to your events events',
      onTrigger: () => router.push(paths.events()),
      icon: <Confetti {...iconProps} />,
    },
    {
      title: 'Quizzes',
      group: 'Navigate',
      description: 'Go to your quizzes',
      onTrigger: () => router.push(paths.quiz()),
      icon: <Queue {...iconProps} />,
    },
  ];

  const signinProviderActions: SpotlightAction[] = [
    {
      title: 'Sign in',
      description: 'Sign in to your account',
      group: 'Actions',
      onTrigger: () => router.push(paths.signIn()),
      icon: <SignIn {...iconProps} />,
      keywords: ['login', 'auth'],
    },
    {
      title: 'Sign in with Google',
      group: 'Auth',
      description: 'Sign in with your Google account',
      onTrigger: () => signInWithProvider('google', '/'),
      icon: <GoogleLogo size={24} weight="bold" />,
    },
    {
      title: 'Sign in with Github',
      group: 'Auth',
      description: 'Sign in with your Github account',
      onTrigger: () => signInWithProvider('github', '/'),
      icon: <GithubLogo {...iconProps} />,
    },
    {
      title: 'Sign in with Discord',
      group: 'Auth',
      description: 'Sign in with your Discord account',
      onTrigger: () => signInWithProvider('discord', '/'),
      icon: <DiscordLogo {...iconProps} />,
    },
  ];

  const authActions: SpotlightAction[] = [
    {
      title: 'Sign out',
      description: 'Sign out of your account',
      group: 'Actions',
      onTrigger: () =>
        signOut({
          callbackUrl: '/signin?signOut=true',
        }),
      icon: <SignOut {...iconProps} />,
      keywords: ['logout', 'log out', 'signout'],
    },
  ];

  // TODO: configure showing auth vs non-auth options
  const generalActions: SpotlightAction[] = [
    {
      title: 'Switch theme',
      description: `Switch to ${isDark ? 'light' : 'dark'} mode`,
      group: 'Actions',
      onTrigger: () => toggleColorScheme(),
      icon: isDark ? <Sun {...iconProps} /> : <Moon {...iconProps} />,
      keywords: ['theme', 'mode', 'dark', 'light', 'toggle'],
    },
    {
      title: 'Documentation',
      group: 'Resources',
      description: 'Visit documentation to lean more about all features',
      onTrigger: () => console.log('Documentation'),
      icon: <FileText {...iconProps} />,
    },
  ];

  const ACTIONS: SpotlightAction[] = [...generalActions];

  if (isLoading) {
    // TODO
  } else if (isAuthenticated) {
    // TODO: check route actions per role
    ACTIONS.push(...routeActions);
    ACTIONS.push(...authActions);
  } else {
    ACTIONS.push(...routeActions);
    ACTIONS.push(...signinProviderActions);
  }

  return ACTIONS;
};

export const CustomSpotlightProvider = ({ children }) => {
  const actions = useSpotlightActions();

  return (
    // TODO: only allow providers on spotlight for /signin page
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
