import { Group } from '@mantine/core';
import AuthLayout from 'components/layout/AuthLayout';
import { Button } from 'components/UI/Button/Button';
import ProviderButton, { ProviderId } from 'components/UI/ProviderButton';
import { useAppColorscheme } from 'hooks/colorscheme';
import { GetServerSideProps } from 'next';
import { BuiltInProviderType } from 'next-auth/providers';
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
} from 'next-auth/react';
import React, { useEffect } from 'react';

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  const callbackUrl = process.env.NEXTAUTH_URL;
  return {
    props: { providers, callbackUrl },
  };
};

type Props = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
  callbackUrl: string;
};

const SignInPage = ({ callbackUrl, providers }: Props) => {
  useEffect(() => {
    console.log('providers :>> ', providers);
  }, [providers]);

  const { isDark } = useAppColorscheme();
  const signInHandler = (providerId: ProviderId) => {
    signIn(providerId, { callbackUrl });
  };

  return (
    <Group direction="column" spacing={8}>
      {Object.values(providers).map((provider) => (
        <ProviderButton
          key={provider.id}
          id={provider.id as ProviderId}
          name={provider.name}
          onClick={signInHandler}
        />
      ))}
    </Group>
  );
};

export default SignInPage;

SignInPage.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
