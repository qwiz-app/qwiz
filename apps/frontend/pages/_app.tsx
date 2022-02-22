import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Head from 'next/head';
import { AppProps } from 'next/app';
import Inspect from 'inspx';
import { ThemeIcon, MantineProvider, ColorSchemeProvider } from '@mantine/core';

import '../styles/global.scss';

import { PaintRoller } from 'phosphor-react';
import { useTheme } from 'hooks/theme';

const queryClient = new QueryClient();

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  const { colorScheme, isDark, toggleColorScheme } = useTheme();
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
            <MantineProvider
              withGlobalStyles
              withNormalizeCSS
              theme={{
                colorScheme,
                primaryColor: isDark ? 'gray' : 'dark',
                fontFamily: 'Manrope, sans-serif',
              }}
            >
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
