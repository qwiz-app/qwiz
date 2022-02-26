import { Center, Container } from '@mantine/core';
import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <Container fluid padding={0} sx={() => ({ minHeight: '100vh' })}>
      <Center
        sx={() => ({
          minHeight: '100vh',
        })}
      >
        {children}
      </Center>
    </Container>
  );
};

export default AuthLayout;
