import { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import 'styles/styles.scss';

const CustomApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Qwiz</title>
      </Head>
      <Script
        defer
        data-domain="qwiz.party"
        src="https://stats.qwiz.party/js/plausible.js"
        strategy="worker"
      />
      <main className="app">
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default CustomApp;
