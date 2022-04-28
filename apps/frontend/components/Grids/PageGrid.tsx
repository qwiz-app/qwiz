import { createStyles } from '@mantine/core';
import { ReactNode } from 'react';

interface Props {
  type: 'tiny';
  children: ReactNode;
}

const PageGrid = ({ type, children }: Props) => {
  const { classes } = useStyles();

  const className = classes[type];

  return <div className={className}>{children}</div>;
};

export default PageGrid;

const useStyles = createStyles((theme) => ({
  tiny: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
    gap: theme.spacing.md,
  },
}));
