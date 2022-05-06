import { Container, Stack } from '@mantine/core';
import React from 'react';

export const HomepageLayout = ({ children }) => {
  return (
    <Container fluid p={16} pb={32} sx={(t) => ({})}>
      <Stack spacing={64}>{children}</Stack>
    </Container>
  );
};
