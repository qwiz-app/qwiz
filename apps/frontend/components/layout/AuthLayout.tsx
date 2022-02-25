import { Center, Container } from '@mantine/core';
import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <Container fluid padding="xl" sx={() => ({ minHeight: '100vh' })}>
      <Container size="sm" mt={64}>
        <Center>{children}</Center>
      </Container>
    </Container>
  );
};

export default AuthLayout;
