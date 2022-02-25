import { ThemeIcon, UnstyledButton, useMantineTheme } from '@mantine/core';
import { useAppColorscheme } from 'hooks/colorscheme';
import { Sun, Moon, IconProps } from 'phosphor-react';
import React, { useState } from 'react';

const ThemeToggle = (props) => {
  const { toggleColorScheme, isDark, isLight } = useAppColorscheme();
  const theme = useMantineTheme();
  const [{ size, weight }] = useState<IconProps>({
    size: 20,
    weight: 'duotone',
  });
  return (
    <UnstyledButton onClick={() => toggleColorScheme()}>
      <ThemeIcon
        radius="xl"
        size="xl"
        variant="light"
        sx={() => ({
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: isDark
              ? theme.colors.dark[6]
              : theme.colors.gray[1],
          },
        })}
      >
        {isDark && (
          <Sun color={theme.colors.yellow[4]} size={size} weight={weight} />
        )}
        {isLight && (
          <Moon color={theme.colors.dark[8]} size={size} weight={weight} />
        )}
      </ThemeIcon>
    </UnstyledButton>
  );
};

export default ThemeToggle;
