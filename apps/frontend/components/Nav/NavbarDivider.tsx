import { Divider } from '@mantine/core';
import { useAppColorscheme } from 'hooks/colorscheme';
import React from 'react';

const NavbarDivider = (props) => {
  const { isDark } = useAppColorscheme();
  return (
    <Divider
      sx={(t) => ({
        borderTopColor: isDark ? t.colors.dark[5] : t.colors.gray[2],
      })}
    />
  );
};

export default NavbarDivider;
