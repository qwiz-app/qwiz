import { ColorScheme } from '@mantine/core';
import {
  useColorScheme,
  useLocalStorageValue,
  useHotkeys,
} from '@mantine/hooks';
import { ColorSchemeEnum } from 'models/colorscheme';

export const useCustomColorScheme = () => {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorageValue<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: preferredColorScheme,
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(
      value ||
        (colorScheme === ColorSchemeEnum.DARK
          ? ColorSchemeEnum.LIGHT
          : ColorSchemeEnum.DARK)
    );

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return {
    colorScheme,
    toggleColorScheme,
  };
};
