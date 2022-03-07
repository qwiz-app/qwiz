import { Box, Text } from '@mantine/core';

export const AuthLogo = (props) => (
  <Box {...props}>
    <Text sx={(t) => ({ fontFamily: t.fontFamilyMonospace })}>QWIZ</Text>
  </Box>
);
