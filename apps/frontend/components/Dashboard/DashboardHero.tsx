import {
  Anchor,
  createStyles,
  Group,
  Paper,
  Skeleton,
  Stack,
  Title,
} from '@mantine/core';
import { AuthLogo } from 'components/Auth/AuthLogo';
import { CustomDivider } from 'components/UI/CustomDivider';
import { useCurrentUser } from 'hooks/api/users';
import { useBreakpoints } from 'hooks/breakpoints';
import { useAppColorscheme } from 'hooks/colorscheme';
import Link from 'next/link';
import { paths } from 'paths';
import { HeroIllustration } from './HeroIllustration';

export const DashboardHero = (props) => {
  const { classes } = useStyles();
  const { matches } = useBreakpoints();
  const { user, isOrganization, isAuthenticated, isLoading } = useCurrentUser();

  return (
    <Group
      align="stretch"
      direction={matches.max.lg ? 'column' : 'row'}
      className={classes.heroBox}
    >
      <HeroIllustration
        isOrganization={isOrganization ?? false}
        className={classes.illuWrapper}
      />
      <Paper className={classes.paper}>
        <Stack
          px={matches.max.lg ? 32 : 64}
          py={matches.max.lg ? 64 : 64}
          align="start"
          justify="center"
          className={classes.heroContent}
        >
          {isAuthenticated && (
            <Title order={matches.max.lg ? 4 : 2}>
              <Stack spacing={2}>
                Welcome back
                <Skeleton visible={isLoading}>
                  <p>
                    <span className={classes.highlight}>{user?.name}</span>!
                  </p>
                </Skeleton>
              </Stack>
            </Title>
          )}
          {!isAuthenticated && (
            <Title order={matches.max.lg ? 3 : 1}>
              <Group
                spacing={matches.max.sm ? 4 : 'sm'}
                direction={matches.max.sm ? 'column' : 'row'}
              >
                Welcome to
                <span className={classes.highlight}>Qwiz!</span>
              </Group>
            </Title>
          )}
          <Group mt={16}>
            <Link href={isOrganization ? paths.explore() : paths.events()}>
              <Anchor>Check out latest events 👀</Anchor>
            </Link>
            {isOrganization && (
              <>
                <CustomDivider />
                <Link href={paths.quiz()}>
                  <Anchor>Create your fist quiz ❓</Anchor>
                </Link>
              </>
            )}
          </Group>
          <AuthLogo className={classes.logo} />
        </Stack>
      </Paper>
    </Group>
  );
};

const useStyles = createStyles((theme, _params, getRef) => {
  const { isDark } = useAppColorscheme();
  const { matches } = useBreakpoints();

  return {
    heroBox: {
      position: 'relative',
    },

    hero: {
      position: 'relative',
    },

    heroContent: {
      height: '100%',
      marginTop: -8,
    },

    logo: {
      position: 'absolute',
      top: -8,
      right: 0,
      padding: 16,
    },
    highlight: {
      position: 'relative',
      backgroundColor: isDark
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.55)
        : theme.colors[theme.primaryColor][1],
      borderRadius: theme.radius.sm,
      padding: '4px 12px',
    },

    imgWrapper: {
      width: '100%',
      backgroundColor: isDark
        ? theme.fn.rgba(theme.colors[theme.primaryColor][8], 0.55)
        : theme.colors[theme.primaryColor][0],
    },

    illuWrapper: {
      backgroundColor: isDark
        ? theme.fn.rgba(theme.colors[theme.primaryColor][8], 0.55)
        : theme.colors.gray[3],
    },

    paper: {
      minHeight: matches.max.lg ? 'auto' : 400,
      backgroundColor: isDark
        ? theme.fn.rgba(theme.colors[theme.primaryColor][8], 0.55)
        : theme.colors.gray[2],
      flex: 1,
      borderRadius: theme.radius.md,
    },
  };
});
