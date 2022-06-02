import { Box, createStyles, Group, Skeleton, Text } from '@mantine/core';

interface StatsGroupProps {
  data: { title: string; stats: string; description: string }[];
  loading?: boolean;
}

export const StatsGroup = ({ data, loading }: StatsGroupProps) => {
  const { classes } = useStyles();

  const stats = data.map((stat) => (
    <Box key={stat.title} className={classes.stat}>
      <Text className={classes.count}>{stat.stats}</Text>
      <Text className={classes.title}>{stat.title}</Text>
      <Text className={classes.description}>{stat.description}</Text>
    </Box>
  ));
  return (
    <Skeleton visible={loading} radius="md">
      <Group className={classes.root}>{stats}</Group>
    </Skeleton>
  );
};

const useStyles = createStyles((theme) => {
  return {
    root: {
      backgroundImage: `linear-gradient(-60deg, ${theme.colors.dark[4]} 0%, ${theme.colors.dark[7]} 100%)`,
      padding: theme.spacing.xl * 1.5,
      borderRadius: theme.radius.md,

      [theme.fn.smallerThan('sm')]: {
        flexDirection: 'column',
      },
    },

    title: {
      color: theme.white,
      textTransform: 'uppercase',
      fontWeight: 700,
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamilyMonospace,
    },

    count: {
      color: theme.white,
      fontSize: 32,
      lineHeight: 1,
      fontWeight: 700,
      marginBottom: theme.spacing.md,
    },

    description: {
      color: theme.colors.dark[0],
      fontSize: theme.fontSizes.sm,
      marginTop: 5,
    },

    stat: {
      flex: 1,

      '& + &': {
        paddingLeft: theme.spacing.xl,
        marginLeft: theme.spacing.xl,
        borderLeft: `2px solid ${theme.colors.dark[3]}`,

        [theme.fn.smallerThan('sm')]: {
          paddingLeft: 0,
          marginLeft: 0,
          borderLeft: 0,
          paddingTop: theme.spacing.xl,
          marginTop: theme.spacing.xl,
          borderTop: `2px solid ${theme.colors.dark[3]}`,
        },
      },
    },
  };
});
