import { AppShell } from '@mantine/core';
import { AppNavbar } from 'components/Nav/AppNavbar/AppNavbar';
import React from 'react';

export const DashboardShell = ({ children }) => {
  return (
    <AppShell
      padding="md"
      navbar={<AppNavbar />}
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[8]
            : theme.colors.gray[0],
      })}
    >
      {children}
    </AppShell>
  );
};
