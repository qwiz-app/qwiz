import Document, { Html, Head, Main, NextScript } from 'next/document';
import { Favicon } from 'components/SEO/Favicon';

export default class _Document extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <Favicon />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
