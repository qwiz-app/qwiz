import { AppShell as MantineAppShell } from '@mantine/core';
import React from 'react';
import { AppNavbar } from '../Nav/AppNavbar';

export const AppShell = ({ children }) => {
  return (
    <MantineAppShell
      padding="md"
      navbar={<AppNavbar>Moja navigacija</AppNavbar>}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </MantineAppShell>
  );
};
