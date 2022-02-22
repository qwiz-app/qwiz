import { ColorScheme } from '@mantine/core';
import {
  useLocalStorageValue,
  useHotkeys,
  useColorScheme,
} from '@mantine/hooks';

export const useTheme = () => {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorageValue<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: preferredColorScheme,
  });

  /**
   * Usually saving value to localStorage is not the best strategy as it will create FART (https://css-tricks.com/flash-of-inaccurate-color-theme-fart/).
   * If it is possible store user preferred color scheme on server and serve your application without flashes.
   */
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  const isDark = colorScheme === 'dark';
  const isLight = colorScheme === 'light';

  return {
    colorScheme,
    toggleColorScheme,
    isDark,
    isLight,
  };
};
