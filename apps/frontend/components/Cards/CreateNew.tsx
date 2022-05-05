import React from 'react';
import { Plus } from 'phosphor-react';
import { Card, Center, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  card: {
    position: 'relative',
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

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
      withBorder
      radius="sm"
      className={classes.card}
      onClick={onClick}
      {...others}
    >
      <Center style={{ height: '100%' }}>
        <Plus size={48} weight="thin" />
      </Center>
    </Card>
  );
};
