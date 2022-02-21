import '../styles/global.scss';

import { QueryClient, QueryClientProvider } from 'react-query';
import Head from 'next/head';
import { AppProps } from 'next/app';
import Inspect from 'inspx';

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  return (
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
  );
};

export default App;
