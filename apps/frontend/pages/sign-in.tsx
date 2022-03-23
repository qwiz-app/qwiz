import { Group } from '@mantine/core';
import { AuthIllustration } from 'components/auth/AuthIllustration';
import { AuthLogo } from 'components/auth/AuthLogo';
import { AuthProviders } from 'components/auth/AuthProviders';
import { AuthThemeToggle } from 'components/auth/AuthThemeToggle';
import { AuthTitle } from 'components/auth/AuthTitle';
import AuthLayout from 'components/layout/AuthLayout';
import { useBreakpoints } from 'hooks/breakpoints';
import { GetServerSideProps } from 'next';
import { BuiltInProviderType } from 'next-auth/providers';
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
} from 'next-auth/react';

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  const redirectUrl = process.env.NEXTAUTH_URL;
  return {
    props: { providers, redirectUrl },
  };
};

export interface SignInProps {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
  redirectUrl: string;
}

const SignInPage = (props: SignInProps) => {
  const { matches } = useBreakpoints();

  return (
    <>
      <AuthThemeToggle
        sx={() => ({
          position: 'absolute',
          top: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
        })}
      />
      <AuthLogo
        sx={() => ({
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
        })}
      />
      <Group
        noWrap
        align="center"
        position="center"
        spacing={100}
        sx={() => ({ marginLeft: matches.min.md && '-10vw' })}
      >
        {matches.min.md && <AuthIllustration style={{ flex: '0 0 60vh' }} />}
        <Group direction="column" position="left" mt={-16}>
          <AuthTitle />
          <AuthProviders {...props} />
        </Group>
      </Group>
    </>
  );
};

export default SignInPage;

SignInPage.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
