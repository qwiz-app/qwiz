/* eslint-disable no-nested-ternary */
import {
  Group,
  Text,
  ThemeIcon,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useAppColorscheme } from 'hooks/colorscheme';
import { isCurrentRoute } from 'lib/router';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';

export type NavbarItemModel = {
  icon: ReactNode;
  label: string;
  href: string;
  color?: string;
};

type Props = NavbarItemModel;

export const NavbarItem = ({ label, href, icon, color }: Props) => {
  const { isDark } = useAppColorscheme();
  const theme = useMantineTheme();
  const router = useRouter();

  const isActive = isCurrentRoute(router.pathname, href);

  return (
    <Link href={href} passHref>
      <UnstyledButton
        sx={(t) => ({
          width: '100%',
          borderRadius: t.radius.sm,
          padding: 8,
          background: isActive
            ? isDark
              ? t.colors.gray[9]
              : t.colors.gray[0]
            : 'transparent',
          '&:hover': {
            backgroundColor: isDark ? t.colors.gray[9] : t.colors.gray[0],
          },
        })}
      >
        <Group>
          <ThemeIcon
            radius="sm"
            size="lg"
            variant={isActive ? 'filled' : 'light'}
          >
            {icon}
          </ThemeIcon>
          <Text size="md">{label}</Text>
        </Group>
      </UnstyledButton>
    </Link>
  );
};
