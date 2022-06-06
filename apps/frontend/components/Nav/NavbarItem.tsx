import {
  Badge,
  createStyles,
  Group,
  Text,
  ThemeIcon,
  UnstyledButton,
} from '@mantine/core';
import cn from 'classnames';
import { useAppColorscheme } from 'hooks/colorscheme';
import { isActiveRoute } from 'lib/router';
import { useRouter } from 'next/router';
import { NavItemModel } from 'types/elements/nav-item';

const useStyles = createStyles((t, isActive: boolean) => {
  const { isDark } = useAppColorscheme();
  return {
    navItem: {
      borderRadius: t.radius.sm,
      padding: 8,
      /* eslint-disable no-nested-ternary */
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

type Props = NavItemModel;

export const NavbarItem = ({
  label,
  href,
  icon,
  color,
  onClick,
  onSelect,
  children,
  btnClass,
  soon,
}: Props) => {
  const router = useRouter();
  const isActive = isActiveRoute(router.pathname, href);
  const { classes } = useStyles(isActive);

  const onNavItemClickHandler = () => {
    if (onClick) {
      onClick?.();
    }
    if (href) {
      router.push(href);
    }
    onSelect?.();
  };

  return (
    <UnstyledButton
      className={cn(classes.navItem, btnClass)}
      onClick={onNavItemClickHandler}
    >
      <Group noWrap>
        <ThemeIcon size="lg" variant={isActive ? 'filled' : 'light'}>
          {icon}
        </ThemeIcon>
        {children || (
          <Group spacing="xs" sx={{ width: '100%' }} align="top">
            <Text size="md" lineClamp={1}>
              {label}
            </Text>
            {soon && (
              <Badge variant="filled" size="xs" mt={-4}>
                Soon
              </Badge>
            )}
          </Group>
        )}
      </Group>
    </UnstyledButton>
  );
};
