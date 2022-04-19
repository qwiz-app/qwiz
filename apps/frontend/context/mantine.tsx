import {
  ColorSchemeProvider,
  MantineProvider,
  ModalProps,
} from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import { useCustomColorScheme } from './colorscheme';
import { CustomSpotlightProvider } from './spotlight';
import { useGlobalTheme } from './theme';

export const CustomMantineProvider = ({ children }) => {
  const { colorScheme, toggleColorScheme } = useCustomColorScheme();
  const theme = useGlobalTheme({ colorScheme });

  const modalProps: Partial<Omit<ModalProps, 'opened'>> = {
    centered: true,
    radius: 'sm',
    shadow: 'sm',
    overlayOpacity: 0.95,
    // theme.colors.dark[9], .gray[2]
    overlayColor: colorScheme === 'dark' ? '#101113' : '#E9ECEF',
  };

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        <NotificationsProvider position="top-right">
          <ModalsProvider modalProps={modalProps}>
            <CustomSpotlightProvider>{children}</CustomSpotlightProvider>
          </ModalsProvider>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
