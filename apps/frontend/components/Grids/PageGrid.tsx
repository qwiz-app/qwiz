import { createStyles } from '@mantine/core';
import { ReactNode } from 'react';
import cn from 'classnames';

interface Props {
  type: 'big' | 'small' | 'tiny' | 'tiniest';
  children: ReactNode;
}

const PageGrid = ({ type, children }: Props) => {
  const { classes } = useStyles();

  const className = classes[type];

  return <div className={cn(classes.grid, className)}>{children}</div>;
};

export default PageGrid;

const useStyles = createStyles((theme) => ({
  grid: {
    display: 'grid',
    gap: theme.spacing.md,
  },

  big: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
  },

  small: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
  },

  tiny: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
  },

  tiniest: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
  },
}));
