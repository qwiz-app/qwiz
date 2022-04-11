import { Container } from '@mantine/core';
import React from 'react';

export const HomepageLayout = ({ children }) => {
  return (
    <Container
      fluid
      sx={(t) => ({
        // paddingTop: t.spacing.sm,
        // paddingBottin: t.spacing.lg,
        // paddingLeft: 0,
        // paddingRight: 0,
        // TODO: mantine new padding prop not recongized
        padding: '0 !important',
        // backgroundColor: t.colors.orange[0],
      })}
    >
      {children}
    </Container>
  );
};
