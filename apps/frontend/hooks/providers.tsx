import { BuiltInProviderType } from 'next-auth/providers';
import { signIn } from 'next-auth/react';
import { IconProps, GoogleLogo, GithubLogo, DiscordLogo } from 'phosphor-react';
import React from 'react';

export type ProviderId = 'discord' | 'google' | 'github';

type ProviderStylesModel = Record<ProviderId, ProviderStyleModel>;

interface ProviderStyleModel {
  color: string;
  icon: React.ReactNode;
}

export const useProviders = () => {
  const { weight, size }: IconProps = {
    weight: 'duotone',
    size: 22,
  };
  const providers: ProviderStylesModel = {
    google: {
      color: '#4285f4',
      icon: <GoogleLogo size={size} weight="bold" />,
    },
    github: {
      color: '#171515',
      icon: <GithubLogo size={size} weight={weight} />,
    },
    discord: {
      color: '#5865F2',
      icon: <DiscordLogo size={size} weight={weight} />,
    },
  };

  // TODO: how to get redirect url from next-auth?
  const signInWithProvider = (
    providerId: BuiltInProviderType,
    redirectUrl?: string
  ) => {
    // TODO: check if fallback redirectUrl is alright?
    signIn(providerId, {
      callbackUrl: redirectUrl || window.location.origin,
    });
  };

  return {
    signInWithProvider,
    providers,
  };
};
