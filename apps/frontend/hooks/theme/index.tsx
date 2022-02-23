import { ColorScheme } from '@mantine/core';
import {
  useLocalStorageValue,
  useHotkeys,
  useColorScheme,
} from '@mantine/hooks';

export enum ColorSchemeEnum {
  LIGHT = 'light',
  DARK = 'dark',
}

export const useTheme = () => {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorageValue<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: preferredColorScheme,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(
      value ||
        (colorScheme === ColorSchemeEnum.DARK
          ? ColorSchemeEnum.LIGHT
          : ColorSchemeEnum.DARK)
    );

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  const isDark = colorScheme === ColorSchemeEnum.DARK;
  const isLight = colorScheme === ColorSchemeEnum.LIGHT;

  return {
    colorScheme,
    toggleColorScheme,
    isDark,
    isLight,
  };
};
