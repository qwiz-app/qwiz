import { createStyles, Group, Stack } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import { AuthIllustration } from 'components/Auth/AuthIllustration';
import { AuthLogo } from 'components/Auth/AuthLogo';
import { AuthProviders } from 'components/Auth/AuthProviders';
import { AuthThemeToggle } from 'components/Auth/AuthThemeToggle';
import { AuthTitle } from 'components/Auth/AuthTitle';
import AuthLayout from 'components/Layouts/AuthLayout';
import { useBreakpoints } from 'hooks/breakpoints';
import config from 'lib/config';
import { errors } from 'lib/next-auth';
import { GetServerSideProps } from 'next';
import { BuiltInProviderType } from 'next-auth/providers';
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
} from 'next-auth/react';
import { useRouter } from 'next/router';
import { paths } from 'paths';
import { useEffect } from 'react';

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  const redirectUrl = config.nextAuth.url;
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
  const router = useRouter();
  const { query } = router;

  const { showNotification } = useNotifications();
  const { matches } = useBreakpoints();
  const { classes } = useStyles();

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
      if (Array.isArray(error)) {
        error.forEach(showErrorNotification);
      } else {
        showErrorNotification(error);
      }
    }

    // eslint-disable-next-line eqeqeq
    if (signOut == 'true') {
      showSignedOutNotification();
      router.replace(paths.signIn());
    }
  }, [query]);

  return (
    <>
      <AuthThemeToggle className={classes.themeToggle} />
      <Group noWrap align="center" className={classes.content}>
        <div>{matches.min.md && <AuthIllustration />}</div>
        <Stack align={matches.min.md ? 'left' : 'center'}>
          <AuthTitle />
          <AuthProviders {...props} />
        </Stack>
      </Group>
      <AuthLogo className={classes.logo} />
    </>
  );
};

export default SignInPage;

SignInPage.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};

export const useStyles = createStyles((theme, _params, getRef) => {
  const { matches } = useBreakpoints();

  return {
    themeToggle: {
      position: 'absolute',
      top: '2rem',
      left: '50%',
      transform: 'translateX(-50%)',
    },

    logo: {
      position: 'absolute',
      bottom: '2rem',
      left: '50%',
      transform: 'translateX(-50%)',
    },

    content: {
      marginLeft: matches.min.md && '-10vw',
      transform: matches.min.md ? 'translateY(-4vh)' : 'translateY(-6vh)',
    },
  };
});
