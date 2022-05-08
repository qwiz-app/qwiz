import { Badge, createStyles, Paper, UnstyledButton } from '@mantine/core';
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

  return (
    <UnstyledButton className={classes.wrapper} onClick={() => onSelect(role)}>
      <Paper
        shadow="md"
        p="sm"
        sx={{ backgroundImage: `url(${image})` }}
        className={cn([classes.card, selected && classes.selectedCard])}
      >
        <Badge
          className={classes.title}
          size="md"
          variant="filled"
          color={selected && (role === Role.ORGANIZATION ? 'violet' : 'yellow')}
        >
          {title}
        </Badge>
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
    width: '100%',
    maxWidth: 240,
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
    marginTop: theme.spacing.xs,
  },
}));
