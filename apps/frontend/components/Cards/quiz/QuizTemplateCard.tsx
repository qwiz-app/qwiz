import { Card, createStyles } from '@mantine/core';
import React from 'react';

interface Props {
  onClick?: () => void;
}

export const QuizTemplateCard = ({
  onClick,
  ...others
}: Props & Omit<React.ComponentPropsWithoutRef<'div'>, keyof Props>) => {
  const { classes } = useStyles();

  return (
    <Card
      radius="md"
      withBorder
      className={classes.card}
      onClick={onClick}
      {...others}
    >
      template
    </Card>
  );
};

const useStyles = createStyles((theme) => ({
  card: {
    position: 'relative',
    height: 160,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'all 250ms',

    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[3]
        : theme.colors.dark[0],
    cursor: 'pointer',

    '&:hover': {
      boxShadow: theme.shadows.xl,
      background:
        theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    },
  },
}));
