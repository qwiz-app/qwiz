import { QueryClient, QueryClientProvider } from 'react-query';
import Head from 'next/head';
import { AppProps } from 'next/app';

import '../styles/styles.scss';

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>qwiz</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </QueryClientProvider>
  );
};

export default App;
