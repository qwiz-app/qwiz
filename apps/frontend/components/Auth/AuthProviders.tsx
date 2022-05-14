import { Stack } from '@mantine/core';
import ProviderButton from 'components/UI/ProviderButton';
import { ProviderEmail } from 'components/UI/ProviderEmail';
import { ProviderId, useProviders } from 'hooks/providers';
import { BuiltInProviderType } from 'next-auth/providers';
import { SignInProps } from 'pages/signin';

export const AuthProviders = ({
  providers,
  redirectUrl,
  csrfToken,
}: SignInProps) => {
  const { signInWithProvider } = useProviders();

  const signInHandler = (id: BuiltInProviderType) =>
    signInWithProvider(id, redirectUrl);

  return (
    <Stack spacing={8} align="center" sx={() => ({ width: 'fit-content' })}>
      {Object.values(providers).map((provider) => {
        if (provider.id === 'email') {
          return <ProviderEmail key={provider.id} csrfToken={csrfToken} />;
        }
        return (
          <ProviderButton
            key={provider.id}
            id={provider.id as ProviderId}
            name={provider.name}
            onClick={() => signInHandler(provider.id as BuiltInProviderType)}
          />
        );
      })}
    </Stack>
  );
};
