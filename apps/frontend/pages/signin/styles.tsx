import { createStyles } from '@mantine/core';
import { useBreakpoints } from 'hooks/breakpoints';

export const useStyles = createStyles((theme, _params, getRef) => {
  const { matches } = useBreakpoints();

  return {
    themeToggle: {
      position: 'absolute',
      top: '2rem',
      left: '50%',
      transform: 'translateX(-50%)',
    },

    logo: {
      position: 'absolute',
      bottom: '2rem',
      left: '50%',
      transform: 'translateX(-50%)',
    },

    content: {
      marginLeft: matches.min.md && '-10vw',
      transform: 'translateY(-2vmax)',
    },
  };
});
