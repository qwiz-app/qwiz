import { Box, createStyles, Text, Title } from '@mantine/core';
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
}

export const PageSection = ({ title, description, children }: Props) => {
  const { classes } = useStyles();
  return (
    <section>
      {title && (
        <Box className={classes.headerWrapper}>
          {title && <Title className={classes.title}>{title}</Title>}
          {description && (
            <Box sx={(sx) => ({ maxWidth: 500 })} p={0}>
              <Text size="sm" color="dimmed">
                {description}
              </Text>
            </Box>
          )}
        </Box>
      )}
      <Box>{children}</Box>
    </section>
  );
};
