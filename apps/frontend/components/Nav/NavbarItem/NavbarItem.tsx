/* eslint-disable no-nested-ternary */
import {
  createStyles,
  Group,
  Text,
  ThemeIcon,
  UnstyledButton,
} from '@mantine/core';
import cn from 'classnames';
import { useAppColorscheme } from 'hooks/colorscheme';
import { isCurrentRoute } from 'lib/router';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

export type NavbarItemModel = {
  icon: ReactNode;
  label?: string;
  href?: string;
  color?: string;
  onClick?: () => void;
  children?: ReactNode;
  btnClass?: string;
};

const useStyles = createStyles((t, isActive: boolean) => {
  const { isDark } = useAppColorscheme();
  return {
    navItem: {
      borderRadius: t.radius.sm,
      padding: 8,
      background: isActive
        ? isDark
          ? t.colors.gray[9]
          : t.colors.gray[1]
        : 'transparent',
      outline: 'none',

      '&:hover': {
        backgroundColor: isDark
          ? t.fn.darken(t.colors.gray[9], 0.1)
          : t.colors.gray[0],
        outline: 'none',
      },

      '&:focus': {
        outline: 'none',
      },
    },
  };
});

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
  const router = useRouter();

  const isActive = isCurrentRoute(router.pathname, href);
  const { classes } = useStyles(isActive);

  const btn = (
    <UnstyledButton className={cn(classes.navItem, btnClass)} onClick={onClick}>
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
