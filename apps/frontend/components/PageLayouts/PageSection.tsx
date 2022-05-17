import { Box, createStyles, Group, Text, Title } from '@mantine/core';
import React from 'react';

const useStyles = createStyles((theme) => ({
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
      fontSize: 28,
    },
  },
}));

interface Props {
  title?: string | React.ReactNode;
  description?: string;
  children: React.ReactNode;
  rightSlot?: React.ReactNode;
}

export const PageSection = ({
  title,
  description,
  children,
  rightSlot,
}: Props) => {
  const { classes } = useStyles();
  return (
    <section>
      {title && (
        <Box className={classes.headerWrapper}>
          <Group align="center" position="apart">
            {title && <Title className={classes.title}>{title}</Title>}
            {rightSlot}
          </Group>
          {description && (
            <Group sx={(sx) => ({ maxWidth: 500 })} p={0}>
              <Text size="sm" color="dimmed">
                {description}
              </Text>
            </Group>
          )}
        </Box>
      )}
      <Box>{children}</Box>
    </section>
  );
};
