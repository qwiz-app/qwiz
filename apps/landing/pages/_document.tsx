import Document, { Html, Head, Main, NextScript } from 'next/document';
import { Favicon } from 'components/SEO/Favicon';

export default class _Document extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <Favicon />
          <script defer data-domain="qwiz.party" src="https://stats.qwiz.party/js/plausible.js" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
