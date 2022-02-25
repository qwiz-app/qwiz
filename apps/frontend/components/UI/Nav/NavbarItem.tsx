import { Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import Link from 'next/link';
import React from 'react';

export const NavbarItem = ({ icon, label, color, href }) => {
  return (
    <Link href={href} passHref>
      <UnstyledButton
        onClick={() => console.log('try focusing button with tab')}
        sx={(theme) => ({
          width: '100%',
          borderRadius: theme.radius.sm,
          padding: '0.45rem',
          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.gray[9]
                : theme.colors.gray[0],
          },
        })}
      >
        <Group>
          <ThemeIcon radius="sm" size="md" variant="light">
            {icon}
          </ThemeIcon>
          <Text size="sm">{label}</Text>
        </Group>
      </UnstyledButton>
    </Link>
  );
};
