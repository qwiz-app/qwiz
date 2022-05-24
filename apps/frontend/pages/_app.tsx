import { NextSeo } from 'next-seo';
import 'styles/fonts.css';
import 'styles/global.css';
import 'styles/reset.css';
import 'windi.css';

import { Container, ScrollArea } from '@mantine/core';
import { RoleGuard } from 'components/Guard/RoleGuard';
import { UserRoleModal } from 'components/Modals/UserRoleModal/UserRoleModal';
import { CustomMantineProvider } from 'context/mantine';
import Inspect from 'inspx';
import config from 'lib/config';
import { SessionProvider } from 'next-auth/react';
import Script from 'next/script';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { showNotification } from '@mantine/notifications';

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

  const plausibleUrl = `https://${config.plausible.domain}`;

  return (
    <>
      <Script
        defer
        data-domain={config.plausible.domain}
        src="https://stats.qwiz.party/js/app.js"
        strategy="worker"
      />
      <NextSeo
        title="Qwiz"
        description="App for building pub quizzes"
        openGraph={{
          url: plausibleUrl,
          title: 'Qwiz',
          description: 'App for building pub quizzes',
          images: [
            {
              url: `${plausibleUrl}/assets/images/cover.png`,
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
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          <CustomMantineProvider>
            <Inspect>
              <RoleGuard>
                <Container
                  fluid
                  px={0}
                  sx={(t) => ({
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100vh',
                    color:
                      t.colorScheme === 'dark'
                        ? t.colors.gray[4]
                        : t.colors.gray[9],
                  })}
                >
                  <ScrollArea sx={{ flex: 1 }}>
                    {getLayout(<Component {...pageProps} />)}
                    <UserRoleModal />
                  </ScrollArea>
                </Container>
              </RoleGuard>
            </Inspect>
          </CustomMantineProvider>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
};

export default App;
