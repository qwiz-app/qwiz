import {
  Group,
  Stack
} from '@mantine/core';
import { Role } from '@prisma/client';
import { useCurrentSession } from 'hooks/api/session';
import { useAssignRole } from 'store/use-assign-role';
import { UserModalInfoCard } from './UserModalInfoCard';

export const UserRoleModalStep2 = () => {
  const { selectedRole } = useAssignRole();
  const { user, isAuthenticated } = useCurrentSession();

  console.log('user :>> ', user);

  // TODO: show complete user card
  if (selectedRole === Role.ATTENDEE) {
    return (
      <Stack>
        {isAuthenticated && (
          <UserModalInfoCard
            avatar={user.image}
            role={selectedRole}
            name={user.name}
            email={user.email}
          />
        )}
      </Stack>
    );
  }

  return (
    <Group>
      <h1>{selectedRole}</h1>
    </Group>
  );
};
