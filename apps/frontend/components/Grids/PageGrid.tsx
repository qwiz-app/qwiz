import { createStyles } from '@mantine/core';
import { ReactNode } from 'react';
import cn from 'classnames';

interface Props {
  type: 'small' | 'tiny' | 'tiniest';
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

  small: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
  },

  tiny: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
  },

  tiniest: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
  },
}));
