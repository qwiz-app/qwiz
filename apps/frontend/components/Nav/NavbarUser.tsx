import { Avatar, Box, Divider, Group, Menu, Skeleton, Text, UnstyledButton } from '@mantine/core';
import { useAppColorscheme } from 'hooks/colorscheme';
import { useCurrentSession } from 'hooks/session';
import Link from 'next/link';
import { Gear, SignOut, Trash, User, UserSwitch } from 'phosphor-react';
import React from 'react';

export const NavbarUser = (props) => {
  const { user, isLoading } = useCurrentSession();
  const { isDark } = useAppColorscheme();
  return (
    <Link href="/profile" passHref>
      <UnstyledButton
        sx={(t) => ({
          width: '100%',
          borderRadius: t.radius.sm,
          padding: 8,
          '&:hover': {
            backgroundColor: isDark ? t.colors.gray[9] : t.colors.gray[1],
          },
        })}
      >
        <Skeleton visible={isLoading}>
          <Group position="apart">
            <Group>
              {!!user && (
                <Avatar size={40} radius="xl" color="teal" src={user.image} />
              )}
              <div>
                <Text size="sm">{user?.name}</Text>
                <Text size="xs" color="gray">
                  {user?.email}
                </Text>
              </div>
            </Group>
            <Box>
              {/* <CaretRight weight="regular" size={18} /> */}
              <Menu trigger="hover" onClick={(e) => e.preventDefault()}>
                <Menu.Label>Application</Menu.Label>
                <Menu.Item icon={<User weight="duotone" />}>Profile</Menu.Item>
                <Menu.Item icon={<Gear weight="duotone" />}>Settings</Menu.Item>
                <Menu.Item icon={<UserSwitch weight="duotone" />}>
                  Switch user
                </Menu.Item>
                <Divider />
                <Menu.Label>Caution</Menu.Label>
                <Menu.Item color="red" icon={<SignOut weight="duotone" />}>
                  Logout
                </Menu.Item>
                <Menu.Item color="red" icon={<Trash weight="duotone" />}>
                  Delete my account
                </Menu.Item>
              </Menu>
            </Box>
          </Group>
        </Skeleton>
      </UnstyledButton>
    </Link>
  );
};
