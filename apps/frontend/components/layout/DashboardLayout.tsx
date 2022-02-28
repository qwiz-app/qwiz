import { Container } from '@mantine/core';
import React from 'react';
import { AppShell } from '../AppShell/AppShell';

const DashboardLayout = ({ children }) => {
  return (
    <AppShell>
      <Container fluid padding="lg">
        {children}
      </Container>
    </AppShell>
  );
};

export default DashboardLayout;
