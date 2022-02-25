import { useMantineColorScheme } from '@mantine/core';
import { ColorSchemeEnum } from 'models/colorscheme';

export const useAppColorscheme = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const isDark = colorScheme === ColorSchemeEnum.DARK;
  const isLight = colorScheme === ColorSchemeEnum.LIGHT;

  return {
    colorScheme,
    toggleColorScheme,
    isDark,
    isLight,
  };
};
