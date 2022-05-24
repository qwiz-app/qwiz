import { ActionIcon, Popover, ThemeIcon } from '@mantine/core';
import { useAppColorscheme } from 'hooks/colorscheme';
import { IconProps, Moon, Sun } from 'phosphor-react';
import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import KbdShortcut from './KbdShortcut';

interface Props {
  tooltip?: boolean;
  mono?: boolean;
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
}

export const ThemeToggle = ({ mono, tooltip, tooltipPosition }: Props) => {
  const { toggleColorScheme, isDark, theme } = useAppColorscheme();
  const { size, weight }: IconProps = {
    size: 24,
    weight: 'duotone',
  };
  const [tooltipAllowed] = useState(tooltip && !isMobile);
  const [opened, setOpened] = useState(false);

  const colorschemeIcon = isDark ? (
    <Sun
      color={mono ? 'currentColor' : theme.colors.orange[4]}
      size={size}
      weight={weight}
    />
  ) : (
    <Moon color={theme.colors.dark[8]} size={size} weight={weight} />
  );

  return (
    <Popover
      opened={tooltipAllowed && opened}
      position={tooltipPosition}
      placement="center"
      withArrow
      spacing="xs"
      transitionDuration={250}
      target={
        <ActionIcon
          onClick={() => toggleColorScheme()}
          onMouseEnter={() => setOpened(true)}
          onMouseLeave={() => setOpened(false)}
        >
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
            {colorschemeIcon}
          </ThemeIcon>
        </ActionIcon>
      }
    >
      <KbdShortcut keys={['Ctrl', 'J']} />
    </Popover>
  );
};

ThemeToggle.defaultProps = {
  tooltip: true,
  mono: false,
  tooltipPosition: 'bottom',
};
