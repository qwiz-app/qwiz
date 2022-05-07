import { Card, Center, createStyles } from '@mantine/core';
import { Plus } from 'phosphor-react';
import React from 'react';

interface QuizCardProps {
  onClick: () => void;
}

export const CreateNew = ({
  onClick,
  ...others
}: QuizCardProps &
  Omit<React.ComponentPropsWithoutRef<'div'>, keyof QuizCardProps>) => {
  const { classes } = useStyles();

  return (
    <Card
      radius="md"
      withBorder
      className={classes.card}
      onClick={onClick}
      {...others}
    >
      <Center sx={() => ({ height: '100%' })}>
        <Plus size={40} weight="duotone" />
      </Center>
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
