import { Container } from '@mantine/core';
import { useBreakpoints } from 'hooks/breakpoints';
import React from 'react';
import { AppShell } from '../AppShell/AppShell';

const DashboardLayout = ({ children }) => {
  const { matches } = useBreakpoints();

  const sidePadding = () => {
    if (matches.max.sm) {
      return 0;
    }
    if (matches.max.md) {
      return 8;
    }
    if (matches.max.lg) {
      return 16;
    }
    return 32;
  };

  return (
    <AppShell>
      <Container
        fluid
        pt={16}
        py={32}
        px={sidePadding()}
        sx={() => ({
          maxWidth: 3000,
        })}
      >
        {children}
      </Container>
    </AppShell>
  );
};

export default DashboardLayout;
