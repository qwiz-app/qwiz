import 'styles/global.scss';

import { Container } from '@mantine/core';
import { CustomColorSchemeProvider } from 'context/colorscheme';
import Inspect from 'inspx';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Inspect>
          <Head>
            <title>Qwiz</title>
          </Head>
          <CustomColorSchemeProvider>
            <Container
              fluid
              padding={0}
              styles={(theme) => ({
                root: {
                  minHeight: '100vh',
                  backgroundColor:
                    theme.colorScheme === 'dark'
                      ? theme.colors.dark[8]
                      : theme.colors.gray[0],
                },
              })}
            >
              <Component {...pageProps} />
            </Container>
          </CustomColorSchemeProvider>
        </Inspect>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default App;
