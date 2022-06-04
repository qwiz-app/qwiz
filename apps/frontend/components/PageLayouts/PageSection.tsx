import { Box, createStyles, Group, Skeleton, Text, Title } from '@mantine/core';
import { useBreakpoints } from 'hooks/breakpoints';
import React from 'react';

const useStyles = createStyles((theme) => {
  return {
    wrapper: {
      paddingTop: theme.spacing.xl * 4,
      paddingBottom: theme.spacing.xl * 4,
    },

    headerWrapper: {
      marginBottom: theme.spacing.lg,
    },

    title: {
      fontSize: 30,
      fontWeight: 900,
      marginBottom: 6,

      [theme.fn.smallerThan('sm')]: {
        fontSize: 24,
      },
    },
  };
});

interface Props {
  title?: string | React.ReactNode;
  description?: string;
  children: React.ReactNode;
  rightSlot?: React.ReactNode;
  loading?: boolean;
}

export const PageSection = ({
  title,
  description,
  children,
  rightSlot,
  loading = false,
}: Props) => {
  const { classes } = useStyles();
  const { matches } = useBreakpoints();

  return (
    <section>
      {title && (
        <Box className={classes.headerWrapper}>
          <Group align="center" position="apart" spacing={8}>
            <Skeleton visible={loading} width={loading && 200}>
              {title && <Title className={classes.title}>{title}</Title>}
            </Skeleton>
            {matches.min.sm && rightSlot}
          </Group>
          {description && (
            <Group sx={(sx) => ({ maxWidth: 500 })} p={0}>
              <Text size="sm" color="dimmed">
                {description}
              </Text>
            </Group>
          )}
          <Box mt={12}>{matches.max.sm && rightSlot}</Box>
        </Box>
      )}
      <Box>{children}</Box>
    </section>
  );
};
