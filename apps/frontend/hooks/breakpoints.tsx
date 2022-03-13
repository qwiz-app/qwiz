import { useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export const useBreakpoints = () => {
  const { breakpoints } = useMantineTheme();

  const matches = {
    max: {
      xs: useMediaQuery(`(max-width: ${breakpoints.xs}px)`),
      sm: useMediaQuery(`(max-width: ${breakpoints.sm}px)`),
      md: useMediaQuery(`(max-width: ${breakpoints.md}px)`),
      lg: useMediaQuery(`(max-width: ${breakpoints.lg}px)`),
      xl: useMediaQuery(`(max-width: ${breakpoints.xl}px)`),
    },
    min: {
      xs: useMediaQuery(`(min-width: ${breakpoints.xs}px)`),
      sm: useMediaQuery(`(min-width: ${breakpoints.sm}px)`),
      md: useMediaQuery(`(min-width: ${breakpoints.md}px)`),
      lg: useMediaQuery(`(min-width: ${breakpoints.lg}px)`),
      xl: useMediaQuery(`(min-width: ${breakpoints.xl}px)`),
    },
  };

  return {
    breakpoints,
    matches,
  };
};
