import {
  Avatar,
  Box,
  Group,
  Skeleton,
  Text,
  UnstyledButton,
  UnstyledButtonProps,
} from '@mantine/core';
import { AvatarRoleIndicator } from 'components/UI/AvatarRoleIndicator';
import { useCurrentUser } from 'hooks/api/users';
import { useAppColorscheme } from 'hooks/colorscheme';
import { CaretRight } from 'phosphor-react';
import { forwardRef } from 'react';

type Props = UnstyledButtonProps<any>;

// eslint-disable-next-line react/display-name
const NavbarUserButton = forwardRef<HTMLButtonElement, Props>(
  (props: Props, ref) => {
    const { user, isSessionLoading, isLoading } = useCurrentUser();
    const { isDark } = useAppColorscheme();

    const loading = isSessionLoading || isLoading;

    if (loading) {
      return (
        <Group position="apart" sx={() => ({ height: 56 })}>
          <Group sx={() => ({ flex: '1' })}>
            <Skeleton visible height={42} circle />
            <Box sx={() => ({ flex: '1', height: '100%' })}>
              <Skeleton height={42} />
            </Box>
          </Group>
        </Group>
      );
    }

    return (
      <UnstyledButton
        ref={ref}
        sx={(t) => ({
          width: '100%',
          borderRadius: t.radius.sm,
          padding: 8,
          '&:hover': {
            backgroundColor: isDark ? t.colors.gray[9] : t.colors.gray[0],
          },
        })}
        {...props}
      >
        <Group position="apart">
          <Group sx={() => ({ flex: '1' })}>
            {user && (
              <AvatarRoleIndicator role={user.role}>
                <Avatar size={40} radius="xl" src={user.image} />
              </AvatarRoleIndicator>
            )}
            <Box sx={() => ({ flex: '1' })}>
              <Text size="sm" lineClamp={1}>
                {user?.name}
              </Text>
              <Text size="xs" color="dimmed" lineClamp={1}>
                {user?.email}
              </Text>
            </Box>
          </Group>
          <CaretRight weight="regular" size={18} />
        </Group>
      </UnstyledButton>
    );
  }
);

export default NavbarUserButton;
