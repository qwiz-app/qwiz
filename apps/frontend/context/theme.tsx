import { MantineThemeOverride } from '@mantine/core';
import { ColorSchemeEnum } from 'models/colorscheme';

export const useGlobalTheme = ({ colorScheme }) => {
  const isDark = colorScheme === ColorSchemeEnum.DARK;

  const globalTheme: MantineThemeOverride = {
    colorScheme,
    fontFamily: 'Manrope, sans-serif',
    fontFamilyMonospace: 'Disket-Mono, monospace',
    headings: {
      fontFamily: 'Manrope, sans-serif',
      fontWeight: 600,
      sizes: {
        h1: { fontSize: 64 },
        h2: { fontSize: 48 },
        h3: { fontSize: 32 },
        h4: { fontSize: 24 },
        h5: { fontSize: 20 },
        h6: { fontSize: 18 },
      },
    },
    colors: {
      'tailwind-teal': [
        '#f0fdfa',
        '#ccfbf1',
        '#99f6e4',
        '#5eead4',
        '#2dd4bf',
        '#14b8a6',
        '#0d9488',
        '#0f766e',
        '#115e59',
        '#134e4a',
      ],
      // TODO: ne valja sve
      'more-dark': [
        '#E9ECEF', // light boja
        '#CED4DA', // light hover boja
        '#909296',
        '#5C5F66',
        '#373A40',
        '#2C2E33',
        '#25262B', // primary boja // boja teksta filled b
        '#1A1B1E', // primary hover boja
        '#141517',
        '#101113',
      ],
      'baseweb-black': [
        '#FFFFFF',
        '#F6F6F6',
        '#EEEEEE',
        '#E2E2E2',
        '#CBCBCB',
        '#AFAFAF',
        '#757575',
        '#545454',
        '#333333',
        '#000000',
      ],
    },
    primaryColor: isDark ? 'gray' : 'more-dark',
    radius: {
      xs: 2,
    },
  };

  return globalTheme;
};
