import { Divider } from '@mantine/core';
import { useAppColorscheme } from 'hooks/colorscheme';

export const NavbarDivider = () => {
  const { isDark } = useAppColorscheme();
  return (
    <Divider
      sx={(t) => ({
        borderTopColor: isDark ? t.colors.dark[5] : t.colors.gray[2],
      })}
    />
  );
};
