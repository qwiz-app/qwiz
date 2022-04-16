import Document, { Html, Head, Main, NextScript } from 'next/document';
import { createGetInitialProps } from '@mantine/next';
import { Favicon } from 'components/SEO/Favicon';

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html lang="en">
        <Head>
          <Favicon />
          <link
            rel="preconnect"
            href="https://api.fonts.coollabs.io"
            crossOrigin=""
          />
          <link
            href="https://api.fonts.coollabs.io/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
          <script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://stats.qwiz.party/js/plausible.js"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
