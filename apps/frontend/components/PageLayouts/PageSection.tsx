import { createStyles, Title } from '@mantine/core';
import React from 'react';

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  title: {
    marginBottom: theme.spacing.xl,
    fontSize: 32,
    fontWeight: 900,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 28,
    },
  },

  description: {
    textAlign: 'center',

    [theme.fn.smallerThan('sm')]: {
      textAlign: 'left',
    },
  },
}));

export const PageSection = ({ title, children }) => {
  const { classes } = useStyles();
  return (
    <section>
      <Title className={classes.title}>{title}</Title>
      <div>{children}</div>
    </section>
  );
};
