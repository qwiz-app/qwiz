import { Box, BoxProps, createStyles } from '@mantine/core';
import { ReactNode } from 'react';
import cn from 'classnames';
import { useBreakpoints } from 'hooks/breakpoints';

interface Props extends BoxProps<'div'> {
  type: 'big' | 'small' | 'tiny' | 'tiniest';
  children: ReactNode;
}

const PageGrid = ({ type, children, ...rest }: Props) => {
  const { classes } = useStyles();
  const className = classes[type];

  return (
    <Box className={cn(classes.grid, className)} {...rest}>
      {children}
    </Box>
  );
};

export default PageGrid;

const useStyles = createStyles((theme) => {
  const { matches } = useBreakpoints();
  return {
    grid: {
      display: 'grid',
      gap: theme.spacing.md,
    },

    big: {
      gridTemplateColumns: matches.min.lg
        ? 'repeat(auto-fill, minmax(500px, 1fr))'
        : '1fr',
    },

    small: {
      gridTemplateColumns: matches.min.sm
        ? 'repeat(auto-fill, minmax(320px, 1fr))'
        : '1fr',
    },

    tiny: {
      gridTemplateColumns: matches.min.sm
        ? 'repeat(auto-fill, minmax(320px, 1fr))'
        : '1fr',
    },

    tiniest: {
      gridTemplateColumns: matches.min.sm
        ? 'repeat(auto-fill, minmax(260px, 1fr))'
        : '1fr',
    },
  };
});
