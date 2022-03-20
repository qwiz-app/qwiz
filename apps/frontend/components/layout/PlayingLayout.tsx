import { Container } from '@mantine/core';
import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <Container fluid px="lg">
      {children}
    </Container>
  );
};

export default AuthLayout;
