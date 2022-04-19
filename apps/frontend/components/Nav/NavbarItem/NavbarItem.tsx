/* eslint-disable no-nested-ternary */
import { Box, Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import { useAppColorscheme } from 'hooks/colorscheme';
import { isCurrentRoute } from 'lib/router';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import cn from 'classnames';

export type NavbarItemModel = {
  icon: ReactNode;
  label?: string;
  href?: string;
  color?: string;
  onClick?: () => void;
  children?: ReactNode;
  btnClass?: string;
};

type Props = NavbarItemModel;

export const NavbarItem = ({
  label,
  href,
  icon,
  color,
  onClick,
  children,
  btnClass,
}: Props) => {
  const { isDark } = useAppColorscheme();
  const router = useRouter();

  const isActive = isCurrentRoute(router.pathname, href);

  const btn = (
    <UnstyledButton
      sx={(t) => ({
        borderRadius: t.radius.sm,
        padding: 8,
        background: isActive
          ? isDark
            ? t.colors.gray[9]
            : t.colors.gray[0]
          : 'transparent',
        outline: 'none',

        '&:hover': {
          backgroundColor: isDark ? t.colors.gray[9] : t.colors.gray[0],
          outline: 'none',
        },

        '&:focus': {
          outline: 'none',
        },
      })}
      className={cn(btnClass)}
      onClick={onClick}
    >
      <Group>
        <ThemeIcon
          radius="sm"
          size="lg"
          variant={isActive ? 'filled' : 'light'}
        >
          {icon}
        </ThemeIcon>
        {children || <Text size="md">{label}</Text>}
      </Group>
    </UnstyledButton>
  );

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {href ? (
        <Link href={href} passHref>
          {btn}
        </Link>
      ) : (
        btn
      )}
    </>
  );
};
