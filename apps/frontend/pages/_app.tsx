import '../styles/styles.scss';

import { AppProps } from 'next/app';
import Head from 'next/head';

export const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>qwiz</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default App;
