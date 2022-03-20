import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import {
  useColorScheme,
  useHotkeys,
  useLocalStorageValue,
} from '@mantine/hooks';
import { ColorSchemeEnum } from 'models/colorscheme';
import { useGlobalTheme } from './theme';

export const CustomColorSchemeProvider = ({ children }) => {
  const { colorScheme, toggleColorScheme } = useCustomColorScheme();
  const theme = useGlobalTheme({ colorScheme });

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export const useCustomColorScheme = () => {
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

  return {
    colorScheme,
    toggleColorScheme,
  };
};
