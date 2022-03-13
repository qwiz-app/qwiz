import { useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { ColorSchemeEnum } from 'models/colorscheme';

export const useAppColorscheme = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  const isDark = colorScheme === ColorSchemeEnum.DARK;
  const isLight = colorScheme === ColorSchemeEnum.LIGHT;

  return {
    colorScheme,
    toggleColorScheme,
    isDark,
    isLight,
    theme,
  };
};
