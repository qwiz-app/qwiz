import { Avatar, Badge, Box, Card, Group, Stack, Text } from '@mantine/core';
import { User } from '@prisma/client';
import { At } from 'phosphor-react';
import { AvatarRoleIndicator } from './AvatarRoleIndicator';

interface Props {
  user: User;
}

const UserProfileCard = ({ user }: Props) => {
  return (
    <Card withBorder sx={{ width: 'max-content' }} pr={40} radius="md">
      <Group noWrap>
        <AvatarRoleIndicator role={user.role} size={24}>
          <Avatar src={user.image} size={94} radius="md" />
        </AvatarRoleIndicator>
        <Stack align="start" spacing={8}>
          <Badge size="sm">{user?.role ?? 'No role'}</Badge>

          <Box>
            <Text size="lg" weight={500}>
              {user.name}
            </Text>

            <Group noWrap align="center" spacing={8} mt={3}>
              <At size={16} weight="duotone" />
              <Text size="xs" color="dimmed">
                {user.email}
              </Text>
            </Group>
          </Box>
        </Stack>
      </Group>
    </Card>
  );
};

export default UserProfileCard;
