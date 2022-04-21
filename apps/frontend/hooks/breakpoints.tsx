import { useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export const useBreakpoints = () => {
  const { breakpoints } = useMantineTheme();

  const matches = {
    max: {
      xs: useMediaQuery(`(max-width: ${breakpoints.xs}px)`, false),
      sm: useMediaQuery(`(max-width: ${breakpoints.sm}px)`, false),
      md: useMediaQuery(`(max-width: ${breakpoints.md}px)`, false),
      lg: useMediaQuery(`(max-width: ${breakpoints.lg}px)`, false),
      xl: useMediaQuery(`(max-width: ${breakpoints.xl}px)`, false),
    },
    min: {
      xs: useMediaQuery(`(min-width: ${breakpoints.xs}px)`, false),
      sm: useMediaQuery(`(min-width: ${breakpoints.sm}px)`, false),
      md: useMediaQuery(`(min-width: ${breakpoints.md}px)`, false),
      lg: useMediaQuery(`(min-width: ${breakpoints.lg}px)`, false),
      xl: useMediaQuery(`(min-width: ${breakpoints.xl}px)`, false),
    },
  };

  return {
    breakpoints,
    matches,
  };
};
