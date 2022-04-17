import { ActionIcon, ThemeIcon, Tooltip } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { useAppColorscheme } from 'hooks/colorscheme';
import { IconProps, Moon, Sun } from 'phosphor-react';
import { isMobile } from 'react-device-detect';

interface Props {
  tooltip?: boolean;
  mono?: boolean;
}

export const ThemeToggle = ({ mono, tooltip }: Props) => {
  const { toggleColorScheme, isDark, theme } = useAppColorscheme();
  const { size, weight }: IconProps = {
    size: 24,
    weight: 'duotone',
  };
  const { hovered, ref } = useHover();

  const colorschemeIcon = isDark ? (
    <Sun
      color={mono ? 'currentColor' : theme.colors.yellow[4]}
      size={size}
      weight={weight}
    />
  ) : (
    <Moon color={theme.colors.dark[8]} size={size} weight={weight} />
  );

  const actionIcon = (
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
        {colorschemeIcon}
      </ThemeIcon>
    </ActionIcon>
  );

  return (
    <Tooltip
      label="Ctrl + J"
      transition="rotate-left"
      transitionDuration={350}
      transitionTimingFunction="ease"
      ref={ref}
      // TODO: dont show on touch devices
      opened={tooltip && !isMobile && hovered}
    >
      {actionIcon}
    </Tooltip>
  );
};

ThemeToggle.defaultProps = {
  tooltip: true,
  mono: false,
};
