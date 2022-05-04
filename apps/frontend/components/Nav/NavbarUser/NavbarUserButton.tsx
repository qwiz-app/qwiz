import {
  Avatar,
  Group,
  Skeleton,
  Text,
  UnstyledButton,
  UnstyledButtonProps,
} from '@mantine/core';
import { useAppColorscheme } from 'hooks/colorscheme';
import { CaretRight } from 'phosphor-react';
import { forwardRef } from 'react';
import { useCurrentUserInfo } from 'hooks/api/users';

// TODO: add type instead of any
type Props = UnstyledButtonProps<any>;

// eslint-disable-next-line react/display-name
const NavbarUserButton = forwardRef<HTMLButtonElement, Props>(
  (props: Props, ref) => {
    const { data: user, isLoading } = useCurrentUserInfo();
    const { isDark } = useAppColorscheme();

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
        <Skeleton visible={user && isLoading} height={40}>
          <Group position="apart">
            <Group>
              {!!user && <Avatar size={40} radius="xl" src={user.image} />}
              <div>
                <Text size="sm">{user?.name}</Text>
                <Text size="xs" color="gray">
                  {user?.email}
                </Text>
              </div>
            </Group>
            <CaretRight weight="regular" size={18} />
          </Group>
        </Skeleton>
      </UnstyledButton>
    );
  }
);

export default NavbarUserButton;
