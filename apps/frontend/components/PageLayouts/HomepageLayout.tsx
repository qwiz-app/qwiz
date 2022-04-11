import { Container } from '@mantine/core';
import React from 'react';

export const HomepageLayout = ({ children }) => {
  return (
    <Container fluid p={16} sx={(t) => ({})}>
      {children}
    </Container>
  );
};
