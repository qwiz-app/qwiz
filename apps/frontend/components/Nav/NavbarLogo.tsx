import { Group, Text, ThemeIcon } from '@mantine/core';
import Link from 'next/link';
import { AppleLogo } from 'phosphor-react';

export const NavbarLogo = () => {
  return (
    <Link href="/" passHref>
      <Group>
        <ThemeIcon radius="xl" size="xl" variant="light" color="teal">
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
