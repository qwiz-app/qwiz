import { Container } from '@mantine/core';
import React from 'react';
import { DashboardShell } from '../../DashboardShell/DashboardShell';

const DashboardLayout = ({ children }) => {
  return (
    <DashboardShell>
      <Container fluid padding="lg">
        {children}
      </Container>
    </DashboardShell>
  );
};

export default DashboardLayout;
