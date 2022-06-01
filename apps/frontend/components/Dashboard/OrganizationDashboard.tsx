import { createStyles, Group, Paper, Title, Stack } from '@mantine/core';
import { AuthLogo } from 'components/Auth/AuthLogo';
import { PageSection } from 'components/PageLayouts/PageSection';
import { StatsGroup } from 'components/Stats/StatsGroup';
import { StatsRing } from 'components/Stats/StatsRing';
import { useCurrentUser } from 'hooks/api/users';
import { useAppColorscheme } from 'hooks/colorscheme';
import { HeroIllustration } from './HeroIllustration';

export const OrganizationDashboard = (props) => {
  const data = [
    {
      title: 'Page views',
      stats: '456,133',
      description:
        '24% more than in the same month last year, 33% more that two years ago',
    },
    {
      title: 'New users',
      stats: '2,175',
      description:
        '13% less compared to last month, new user engagement up by 6%',
    },
    {
      title: 'Completed orders',
      stats: '1,994',
      description:
        '1994 orders were completed this month, 97% satisfaction rate',
    },
  ];

  const { classes } = useStyles();

  const { data: user } = useCurrentUser();

  return (
    <>
      <PageSection title="Dashboard">
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
      </PageSection>
      <PageSection>
        <StatsGroup data={data} />
      </PageSection>
      <PageSection
        title="Event stats"
        description="Your event stats on a glance"
      >
        <StatsRing
          data={[
            {
              label: 'test',
              stats: 'test',
              progress: 52,
              color: 'blue',
              icon: 'up',
            },
            {
              label: 'test',
              stats: 'test',
              progress: 67,
              color: 'orange',
              icon: 'up',
            },
            {
              label: 'test',
              stats: 'test',
              progress: 24,
              color: 'red',
              icon: 'down',
            },
          ]}
        />
      </PageSection>
    </>
  );
};

const useStyles = createStyles((theme, _params, getRef) => {
  const { isDark } = useAppColorscheme();

  return {
    highlight: {
      position: 'relative',
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.55)
          : theme.colors[theme.primaryColor][1],
      borderRadius: theme.radius.sm,
      padding: '4px 12px',
    },

    imgWrapper: {
      width: '100%',
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][8], 0.55)
          : theme.colors[theme.primaryColor][0],
    },

    illuWrapper: {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][8], 0.55)
          : theme.colors.gray[3],
    },

    paper: {
      height: 400,
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][8], 0.55)
          : theme.colors.gray[2],
      flex: 1,
      borderRadius: theme.radius.md,
    },

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
  };
});
