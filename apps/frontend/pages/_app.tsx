import { NextSeo } from 'next-seo';
import 'styles/global.scss';
// import 'windi.css';

import { Container } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { CustomMantineProvider } from 'context/mantine';
import Inspect from 'inspx';
import config from 'lib/config';
import { SessionProvider } from 'next-auth/react';
import Script from 'next/script';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (err: any) => {
      showNotification({
        title: 'Something went wrong',
        message: err?.message || 'Try again later',
        color: 'red',
        autoClose: 6000,
      });
    },
  }),
});

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Script
        defer
        data-domain={config.plausible.domain}
        src="https://stats.qwiz.party/js/plausible.js"
        strategy="worker"
      />
      <NextSeo
        title="Qwiz"
        description="App for building pub quizzes"
        openGraph={{
          url: `https://${config.plausible.domain}`,
          title: 'Qwiz',
          description: 'App for building pub quizzes',
          images: [
            {
              url: `https://${config.plausible.domain}/assets/images/cover.png`,
              width: 1423,
              height: 800,
              alt: 'Cover logo',
              type: 'image/png',
            },
          ],
          site_name: 'Qwiz',
        }}
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
