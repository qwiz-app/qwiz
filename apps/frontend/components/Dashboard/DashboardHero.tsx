import { createStyles, Group, Paper, Title, Stack } from '@mantine/core';
import { AuthLogo } from 'components/Auth/AuthLogo';
import { useCurrentUser } from 'hooks/api/users';
import { useAppColorscheme } from 'hooks/colorscheme';
import { HeroIllustration } from './HeroIllustration';

export const DashboardHero = (props) => {
  const { classes } = useStyles();

  const { data: user } = useCurrentUser();

  return (
    <Group align="stretch" className={classes.heroBox}>
      <HeroIllustration className={classes.illuWrapper} />
      <Paper className={classes.paper}>
        <Stack
          p={64}
          align="start"
          justify="center"
          className={classes.heroContent}
        >
          <Title order={2}>
            <Stack spacing="xs">
              Welcome back
              <p>
                <span className={classes.highlight}>{user?.name}</span>!
              </p>
            </Stack>
          </Title>
          <AuthLogo className={classes.logo} />
        </Stack>
      </Paper>
    </Group>
  );
};

const useStyles = createStyles((theme, _params, getRef) => {
  const { isDark } = useAppColorscheme();

  return {
    heroBox: {
      position: 'relative',
    },

    hero: {
      position: 'relative',
    },

    heroContent: {
      height: '100%',
      marginTop: -16,
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
      height: 400,
      backgroundColor: isDark
        ? theme.fn.rgba(theme.colors[theme.primaryColor][8], 0.55)
        : theme.colors.gray[2],
      flex: 1,
      borderRadius: theme.radius.md,
    },
  };
});
