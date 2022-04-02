import { Group } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import { AuthIllustration } from 'components/auth/AuthIllustration';
import { AuthLogo } from 'components/auth/AuthLogo';
import { AuthProviders } from 'components/auth/AuthProviders';
import { AuthThemeToggle } from 'components/auth/AuthThemeToggle';
import { AuthTitle } from 'components/auth/AuthTitle';
import AuthLayout from 'components/layout/AuthLayout';
import { useBreakpoints } from 'hooks/breakpoints';
import { errors } from 'lib/next-auth';
import { GetServerSideProps } from 'next';
import { BuiltInProviderType } from 'next-auth/providers';
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
} from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

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
  const router = useRouter();
  const { query } = router;
  const { showNotification } = useNotifications();

  const showErrorNotification = (err?: string) => {
    setTimeout(() => {
      showNotification({
        title: 'Whoops!',
        message: errors[err] || errors.default,
        color: 'red',
        autoClose: 8000,
      });
    }, 400);
  };

  const showSignedOutNotification = () => {
    setTimeout(() => {
      showNotification({
        title: 'Signed out',
        message: 'You have been signed out.',
        color: 'green',
        autoClose: 5000,
      });
    }, 400);
  };

  useEffect(() => {
    const { error, signOut } = query;
    if (error) {
      console.error('Auth error:', error);
      if (Array.isArray(error)) {
        error.forEach(showErrorNotification);
      } else {
        showErrorNotification(error);
      }
    }
    // eslint-disable-next-line eqeqeq
    if (signOut == 'true') {
      showSignedOutNotification();
    }
  }, [query]);

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
      <Group
        noWrap
        align="center"
        position="center"
        spacing={100}
        sx={() => ({ marginLeft: matches.min.md && '-10vw' })}
      >
        {matches.min.md && <AuthIllustration style={{ flex: '0 0 60vh' }} />}
        <Group
          direction="column"
          position={matches.min.md ? 'left' : 'center'}
          mt={matches.min.md ? -16 : '-10vh'}
        >
          <AuthTitle />
          <AuthProviders {...props} />
        </Group>
      </Group>
      <AuthLogo
        sx={() => ({
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
        })}
      />
    </>
  );
};

export default SignInPage;

SignInPage.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
