import {
  UnstyledButton,
  Skeleton,
  Group,
  Avatar,
  Box,
  Text,
} from '@mantine/core';
import { useAppColorscheme } from 'hooks/colorscheme';
import { useCurrentSession } from 'hooks/session';
import Link from 'next/link';
import { CaretRight } from 'phosphor-react';
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
            <Box sx={() => ({ padding: '0 .25rem' })}>
              <CaretRight weight="regular" size={18} />
            </Box>
          </Group>
        </Skeleton>
      </UnstyledButton>
    </Link>
  );
};
