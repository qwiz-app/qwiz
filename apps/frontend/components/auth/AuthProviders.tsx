import { Group } from '@mantine/core';
import ProviderButton from 'components/UI/ProviderButton';
import { ProviderId, useProviders } from 'hooks/providers';
import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, LiteralUnion } from 'next-auth/react';
import { SignInProps } from 'pages/signin';

interface Props extends SignInProps {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
  redirectUrl: string;
}

export const AuthProviders = ({ providers, redirectUrl }: Props) => {
  const { signInWithProvider } = useProviders();

  console.table(providers);

  const signInHandler = (id: BuiltInProviderType) =>
    signInWithProvider(id, redirectUrl);

  return (
    <Group
      direction="column"
      spacing={8}
      align="center"
      position="center"
      sx={() => ({ width: 'fit-content' })}
    >
      {Object.values(providers).map((provider) => (
        <ProviderButton
          key={provider.id}
          id={provider.id as ProviderId}
          name={provider.name}
          onClick={() => signInHandler(provider.id as BuiltInProviderType)}
        />
      ))}
    </Group>
  );
};
