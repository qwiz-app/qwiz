import { Box, Title, Group, useMantineTheme, Text } from '@mantine/core';
import { useAppColorscheme } from 'hooks/colorscheme';
import { HandWaving } from 'phosphor-react';
import React from 'react';

export const AuthTitle = () => {
  const { isDark } = useAppColorscheme();
  const theme = useMantineTheme();

  return (
    <Box mb={20}>
      <Title
        order={3}
        sx={(t) => ({
          fontFamily: t.fontFamilyMonospace,
          textTransform: 'uppercase',
        })}
      >
        <Group spacing="sm" align="center">
          <span>Welcome</span>
          <HandWaving
            size={38}
            color={isDark ? theme.colors.teal[5] : 'currentColor'}
            weight="duotone"
            style={{ marginTop: -6 }}
          />
        </Group>
      </Title>
      <Text color="gray">Sign in to get started</Text>
    </Box>
  );
};
