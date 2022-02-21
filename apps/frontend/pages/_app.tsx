import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Head from 'next/head';
import { AppProps } from 'next/app';
import Inspect from 'inspx';
import { MantineProvider } from '@mantine/core';

import '../styles/global.scss';

const queryClient = new QueryClient();

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Inspect>
          <Head>
            <title>qwiz</title>
          </Head>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              fontFamily: 'Manrope, sans-serif',
              colorScheme: 'light',
            }}
          >
            <Component {...pageProps} />
          </MantineProvider>
        </Inspect>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default App;
