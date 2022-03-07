import { Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import { useAppColorscheme } from 'hooks/colorscheme';
import Link from 'next/link';
import React from 'react';

export const NavbarItem = ({ icon, label, color, href }) => {
  const { isDark } = useAppColorscheme();

  return (
    <Link href={href} passHref>
      <UnstyledButton
        sx={(t) => ({
          borderRadius: t.radius.sm,
          padding: 8,
          '&:hover': {
            backgroundColor: isDark ? t.colors.gray[9] : t.colors.gray[1],
          },
        })}
      >
        <Group>
          <ThemeIcon
            radius="sm"
            size="lg"
            variant="light"
            // TODO: decide on colors
            color={isDark ? 'gray' : 'more-dark'}
          >
            {icon}
          </ThemeIcon>
          <Text size="lg">{label}</Text>
        </Group>
      </UnstyledButton>
    </Link>
  );
};
