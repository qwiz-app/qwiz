import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Head from 'next/head';
import { AppProps } from 'next/app';
import Inspect from 'inspx';
import {
  ThemeIcon,
  MantineProvider,
  ColorSchemeProvider,
  MantineThemeOverride,
} from '@mantine/core';

import '../styles/global.scss';

import { PaintRoller } from 'phosphor-react';
import { useTheme } from 'hooks/theme';

const queryClient = new QueryClient();

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  const { colorScheme, isDark, toggleColorScheme } = useTheme();
  const theme: MantineThemeOverride = {
    colorScheme,
    fontFamily: 'Manrope, sans-serif',
    fontFamilyMonospace: 'Disket-Mono, monospace',
    headings: {
      fontFamily: 'Manrope, sans-serif',
      fontWeight: 600,
      sizes: {
        h1: { fontSize: '4rem' },
        h2: { fontSize: '3rem' },
        h3: { fontSize: '2rem' },
        h4: { fontSize: '1.5rem' },
        h5: { fontSize: '1.25rem' },
        h6: { fontSize: '1.15rem' },
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
      // TODO: create custom pallete
      'more-dark': [
        '#DEE2E6',
        '#CED4DA',
        '#ADB5BD',
        '#868E96',
        '#373A40',
        '#2C2E33',
        '#25262B',
        '#1A1B1E',
        '#141517',
        '#000000',
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
      xs: 1,
    },
  };

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Inspect>
          <Head>
            <title>qwiz</title>
          </Head>
          <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
          >
            <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
              <ThemeIcon
                size="lg"
                color={isDark ? 'gray' : 'dark'}
                onClick={() => toggleColorScheme()}
                radius="xl"
              >
                <PaintRoller weight="duotone" />
              </ThemeIcon>
              <Component {...pageProps} />
            </MantineProvider>
          </ColorSchemeProvider>
        </Inspect>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default App;
