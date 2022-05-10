import { AppProps } from 'next/app';
import Script from 'next/script';
import { NextSeo } from 'next-seo';
import 'styles/styles.scss';

const CustomApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Script
        defer
        data-domain="qwiz.party"
        src="https://stats.qwiz.party/js/app.js"
        strategy="worker"
      />
      <NextSeo
        title="Qwiz"
        description="App for building pub quizzes"
        openGraph={{
          url: 'https://qwiz.party',
          title: 'Qwiz',
          description: 'App for building pub quizzes',
          images: [
            {
              url: 'https://qwiz.party/assets/images/cover.png',
              width: 1423,
              height: 800,
              alt: 'Cover logo',
              type: 'image/png',
            },
          ],
          site_name: 'Qwiz',
        }}
      />
      <main className="app">
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default CustomApp;
