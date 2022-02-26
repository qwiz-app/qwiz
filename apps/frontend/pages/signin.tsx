import { Group } from '@mantine/core';
import Peep from 'assets/peep2.svg';
import PeepDark from 'assets/peep2-dark.svg';
import AuthLayout from 'components/layout/AuthLayout';
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
import Image from 'next/image';
import React, { useEffect } from 'react';

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  const redirectUrl = process.env.NEXTAUTH_URL;
  return {
    props: { providers, redirectUrl },
  };
};

type Props = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
  redirectUrl: string;
};

const SignInPage = ({ redirectUrl, providers }: Props) => {
  const { isDark } = useAppColorscheme();

  useEffect(() => {
    console.table(providers);
  }, [providers]);

  const signInHandler = (providerId: ProviderId) => {
    signIn(providerId, { callbackUrl: redirectUrl });
  };

  const illustration = isDark ? PeepDark : Peep;

  return (
    <Group
      noWrap
      align="center"
      position="center"
      spacing={100}
      sx={() => ({ marginLeft: '-10vw' })}
    >
      <div style={{ flex: '0 0 60vh' }}>
        <Image src={illustration} alt="city" objectFit="contain" />
      </div>
      <Group position="center">
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
              onClick={signInHandler}
            />
          ))}
        </Group>
      </Group>
    </Group>
  );
};

export default SignInPage;

SignInPage.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
