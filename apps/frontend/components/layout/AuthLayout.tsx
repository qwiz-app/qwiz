import { Center, Container } from '@mantine/core';
import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <Container fluid padding="xl" sx={() => ({ minHeight: '100vh' })}>
      <Container size="sm">
        <Center sx={() => ({ paddingTop: '20vh' })}>{children}</Center>
      </Container>
    </Container>
  );
};

export default AuthLayout;
