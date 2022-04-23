import { MantineSize, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export const useBreakpoints = () => {
  const { breakpoints } = useMantineTheme();

  type BreakpointType = 'min' | 'max';

  const inital = false;

  const getWidth = (type: BreakpointType, size: MantineSize) =>
    `(${type}-width: ${breakpoints[size]}px)`;

  const maxWidth = (size: MantineSize) => getWidth('max', size);
  const minWidth = (size: MantineSize) => getWidth('min', size);

  const matches = {
    max: {
      xs: useMediaQuery(maxWidth('xs'), inital),
      sm: useMediaQuery(maxWidth('sm'), inital),
      md: useMediaQuery(maxWidth('md'), inital),
      lg: useMediaQuery(maxWidth('lg'), inital),
      xl: useMediaQuery(maxWidth('xl'), inital),
    },
    min: {
      xs: useMediaQuery(minWidth('xs'), inital),
      sm: useMediaQuery(minWidth('sm'), inital),
      md: useMediaQuery(minWidth('md'), inital),
      lg: useMediaQuery(minWidth('lg'), inital),
      xl: useMediaQuery(minWidth('xl'), inital),
    },
  };

  return {
    breakpoints,
    matches,
  };
};
