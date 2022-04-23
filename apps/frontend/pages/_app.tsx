import 'styles/global.scss';

import { Container } from '@mantine/core';
import { CustomMantineProvider } from 'context/mantine';
import Inspect from 'inspx';
import config from 'lib/config';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import Script from 'next/script';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import 'windi.css';

import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (err) => {
      // TODO: show mantine notification
      console.error('Global error', err);
    },
  }),
});

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <title>Qwiz</title>
      </Head>
      <Script
        defer
        data-domain={config.plausible.domain}
        src="https://stats.qwiz.party/js/plausible.js"
        strategy="worker"
      />
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <CustomMantineProvider>
            <Inspect>
              <Container fluid px={0} sx={() => ({ minHeight: '100vh' })}>
                {getLayout(<Component {...pageProps} />)}
              </Container>
            </Inspect>
          </CustomMantineProvider>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
};

export default App;
