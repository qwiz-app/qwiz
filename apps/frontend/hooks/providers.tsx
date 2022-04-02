import { BuiltInProviderType } from 'next-auth/providers';
import { signIn } from 'next-auth/react';
import { DiscordLogo, GithubLogo, GoogleLogo, IconProps } from 'phosphor-react';
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
  const providerStyles: ProviderStylesModel = {
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

  const providerStyle = (id: ProviderId) => providerStyles[id];

  const signInWithProvider = (
    providerId: BuiltInProviderType,
    redirectUrl: string = process.env.NEXTAUTH_URL
  ) => {
    signIn(providerId, {
      callbackUrl: redirectUrl,
    });
  };

  return {
    signInWithProvider,
    providerStyles,
    providerStyle,
  };
};
