import { Group, Text, ThemeIcon } from '@mantine/core';
import { useAppColorscheme } from 'hooks/colorscheme';
import Link from 'next/link';
import { AppleLogo } from 'phosphor-react';
import React from 'react';

export const NavbarLogo = (props) => {
  const { isDark } = useAppColorscheme();
  return (
    <Link href="/" passHref>
      <Group>
        <ThemeIcon
          radius="xl"
          size="xl"
          variant="light"
          color={isDark ? 'teal' : 'currentColor'}
        >
          <AppleLogo size={24} weight="duotone" />
        </ThemeIcon>
        <Text
          transform="uppercase"
          size="xl"
          weight={400}
          sx={(t) => ({ fontFamily: t.fontFamilyMonospace })}
        >
          QWIZ
        </Text>
      </Group>
    </Link>
  );
};
