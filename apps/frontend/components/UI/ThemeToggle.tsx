import { ActionIcon, ThemeIcon, Tooltip, useMantineTheme } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { useAppColorscheme } from 'hooks/colorscheme';
import { IconProps, Moon, Sun } from 'phosphor-react';
import React, { useState } from 'react';

export const ThemeToggle = (props) => {
  const { toggleColorScheme, isDark, isLight } = useAppColorscheme();
  const theme = useMantineTheme();
  const [{ size, weight }] = useState<IconProps>({
    size: 24,
    weight: 'duotone',
  });
  const { hovered, ref } = useHover();
  return (
    <Tooltip
      label="Ctrl + J"
      transition="rotate-left"
      transitionDuration={350}
      transitionTimingFunction="ease"
      ref={ref}
      opened={hovered}
      radius="xs"
    >
      <ActionIcon onClick={() => toggleColorScheme()}>
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
      </ActionIcon>
    </Tooltip>
  );
};
