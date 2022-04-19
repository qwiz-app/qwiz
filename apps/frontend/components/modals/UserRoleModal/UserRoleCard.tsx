import { createStyles, Paper, Title, UnstyledButton } from '@mantine/core';
import { Role } from '@prisma/client';
import cn from 'classnames';
import { ReactElement } from 'react';

type Props = {
  image: string;
  title: string;
  role: Role;
  selected: boolean;
  onSelect: (role: Role) => void;
  animatedWrapper?: ReactElement;
};

export const UserRoleCard = ({
  image,
  title,
  role,
  selected,
  onSelect,
  animatedWrapper,
}: Props) => {
  const { classes } = useStyles();

  const selectRole = () => onSelect(role);

  return (
    <UnstyledButton className={classes.wrapper} onClick={selectRole}>
      <Paper
        shadow="md"
        p="sm"
        radius="md"
        sx={{ backgroundImage: `url(${image})` }}
        className={cn([classes.card, selected && classes.selectedCard])}
      >
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </Paper>
      {selected && animatedWrapper}
    </UnstyledButton>
  );
};

const useStyles = createStyles((theme) => ({
  wrapper: {
    flex: 1,
    display: 'flex',
    position: 'relative',
  },

  card: {
    flex: 1,
    aspectRatio: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'grayscale(60%)',
    transition: 'filter 0.3s ease-in-out',

    '&:hover': {
      filter: 'grayscale(0%)',
    },
  },

  selectedCard: {
    filter: 'grayscale(0%)',
  },

  title: {
    color: theme.white,
    lineHeight: 1.2,
    fontSize: 18,
    marginTop: theme.spacing.xs,
    backgroundColor: theme.colors.dark[9],
    padding: `${theme.spacing.xs / 2}px ${theme.spacing.md / 2}px`,
    borderRadius: theme.radius.sm,
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}));
