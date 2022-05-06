import { Container, Stack } from '@mantine/core';
import { useBreakpoints } from 'hooks/breakpoints';
import React from 'react';

export const HomepageLayout = ({ children }) => {
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
    <Container fluid px={sidePadding()} pt={16} py={32} sx={(t) => ({})}>
      <Stack spacing={64}>{children}</Stack>
    </Container>
  );
};
