import { Box, Text } from '@mantine/core';

export const AuthLogo = (props) => {
  return (
    <Box {...props}>
      <Text sx={(t) => ({ fontFamily: t.fontFamilyMonospace })}>QWIZ</Text>
    </Box>
  );
};
