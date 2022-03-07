import { Box } from '@mantine/core';
import { ThemeToggle } from 'components/UI/ThemeToggle';

export const AuthThemeToggle = (props) => (
  <Box {...props}>
    <ThemeToggle tooltip mono />
  </Box>
);
