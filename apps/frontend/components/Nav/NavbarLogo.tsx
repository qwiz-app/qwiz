import { Group, Text, ThemeIcon } from '@mantine/core';
import { AppleLogo } from 'phosphor-react';
import React from 'react';

export const NavbarLogo = (props) => {
  return (
    <Group>
      <ThemeIcon radius="xl" size="xl" color="teal">
        <AppleLogo size={24} weight="duotone" />
      </ThemeIcon>
      <Text
        transform="uppercase"
        size="xl"
        weight="bold"
        sx={(t) => ({ fontFamily: t.fontFamilyMonospace })}
      >
        QWIZ
      </Text>
    </Group>
  );
};
