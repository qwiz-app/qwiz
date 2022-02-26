import { Box, Group, Text, Title, useMantineTheme } from '@mantine/core';
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
import { ThemeToggle } from 'components/UI/ThemeToggle';
import { HandWaving } from 'phosphor-react';

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
  const theme = useMantineTheme();

  useEffect(() => {
    console.table(providers);
  }, [providers]);

  const signInHandler = (providerId: ProviderId) => {
    signIn(providerId, { callbackUrl: redirectUrl });
  };

  const illustration = isDark ? PeepDark : Peep;

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <Group direction="column" position="center">
          <ThemeToggle tooltip mono />
        </Group>
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <Group direction="column" position="center">
          <Text sx={(t) => ({ fontFamily: t.fontFamilyMonospace })}>QWIZ</Text>
        </Group>
      </div>
      <Group
        noWrap
        align="center"
        position="center"
        spacing={100}
        sx={() => ({ marginLeft: '-10vw' })}
      >
        <div style={{ flex: '0 0 60vh' }}>
          <Image
            src={illustration}
            alt="city"
            objectFit="contain"
            className="signin-hero"
          />
        </div>
        <Group direction="column" position="left">
          <Box mb={20}>
            <Title
              order={3}
              sx={(t) => ({
                fontFamily: t.fontFamilyMonospace,
              })}
            >
              <Group spacing="sm" align="center">
                <span>Welcome</span>
                <HandWaving
                  size={38}
                  color={isDark ? theme.colors.teal[5] : 'currentColor'}
                  weight="duotone"
                  style={{ marginTop: '-6px' }}
                />
              </Group>
            </Title>
            <Text color="gray">Sign in to get started</Text>
          </Box>

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
    </>
  );
};

export default SignInPage;

SignInPage.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
