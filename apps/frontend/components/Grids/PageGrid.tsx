import { Box, BoxProps, createStyles } from '@mantine/core';
import { ReactNode } from 'react';
import cn from 'classnames';
import { useBreakpoints } from 'hooks/breakpoints';

interface Props extends BoxProps<'div'> {
  type: 'eventHighlight' | 'event' | 'quiz' | 'quizTemplate' | 'teams';
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

    eventHighlight: {
      gridTemplateColumns: matches.min.lg
        ? 'repeat(auto-fill, minmax(500px, 1fr))'
        : '1fr',
    },

    event: {
      gridTemplateColumns: matches.min.sm
        ? 'repeat(auto-fill, minmax(320px, 1fr))'
        : '1fr',
    },

    teams: {
      gridTemplateColumns: matches.min.sm
        ? 'repeat(auto-fill, minmax(380px, 1fr))'
        : '1fr',
    },

    quiz: {
      gridTemplateColumns: matches.min.sm
        ? 'repeat(auto-fill, minmax(320px, 1fr))'
        : '1fr',
    },

    quizTemplate: {
      gridTemplateColumns: matches.min.sm
        ? 'repeat(auto-fill, minmax(260px, 1fr))'
        : '1fr',
    },
  };
});
