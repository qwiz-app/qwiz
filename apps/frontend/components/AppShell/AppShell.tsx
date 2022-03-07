import { AppShell as MantineAppShell } from '@mantine/core';
import { Navbar } from 'components/Nav/Navbar/Navbar';
import React from 'react';

export const AppShell = ({ children }) => (
  <MantineAppShell
    padding="md"
    navbar={<Navbar />}
    sx={(theme) => ({
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    })}
  >
    {children}
  </MantineAppShell>
);
