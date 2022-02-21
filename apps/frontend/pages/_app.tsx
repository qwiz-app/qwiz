import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Head from 'next/head';
import { AppProps } from 'next/app';
import Inspect from 'inspx';

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
          <main className="app">
            <Component {...pageProps} />
          </main>
        </Inspect>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default App;
