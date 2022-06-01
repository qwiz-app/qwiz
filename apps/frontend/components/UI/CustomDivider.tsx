import { Box } from '@mantine/core';
import { useAppColorscheme } from 'hooks/colorscheme';

export const CustomDivider = () => {
  const { isDark } = useAppColorscheme();

  return (
    <Box
      sx={(t) => ({
        width: '2px',
        height: '18px',
        background: isDark ? t.colors.dark[5] : t.colors.gray[4],
      })}
    />
  );
};
