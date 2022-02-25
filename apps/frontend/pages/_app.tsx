import 'styles/global.scss';

import { CustomColorSchemeProvider } from 'context/colorscheme';
import Inspect from 'inspx';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Container } from '@mantine/core';

const queryClient = new QueryClient();

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <title>Qwiz</title>
      </Head>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <CustomColorSchemeProvider>
            <Inspect>
              <Container fluid padding={0} sx={() => ({ minHeight: '100vh' })}>
                {getLayout(<Component {...pageProps} />)}
              </Container>
            </Inspect>
          </CustomColorSchemeProvider>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
};

export default App;
