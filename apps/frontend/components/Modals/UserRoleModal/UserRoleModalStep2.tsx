import { Group, Stack, TextInput } from '@mantine/core';
import { Role } from '@prisma/client';
import { useCurrentSession } from 'hooks/api/session';
import { IdentificationBadge } from 'phosphor-react';
import { useState } from 'react';
import { useAssignRole } from 'store/use-assign-role';
import { UserModalInfoCard } from './UserModalInfoCard';

export const UserRoleModalStep2 = () => {
  const { selectedRole } = useAssignRole();
  const { user } = useCurrentSession();

  const [orgName, setOrgName] = useState('');

  if (selectedRole === Role.ORGANIZER) {
    return (
      <Stack spacing={16}>
        <TextInput
          placeholder="Pub Ching Chong"
          label="Organization name"
          description="Your account name will remain unchanged"
          variant="filled"
          size="md"
          onChange={(e) => setOrgName(e.target.value)}
          required
          icon={<IdentificationBadge size={20} weight="duotone" />}
        />
        {orgName && (
          <UserModalInfoCard
            avatar={user.image}
            role={selectedRole}
            name={orgName}
            email={user.email}
          />
        )}
      </Stack>
    );
  }

  return (
    <Stack>
      <UserModalInfoCard
        avatar={user.image}
        role={selectedRole}
        name={user.name}
        email={user.email}
      />
    </Stack>
  );
};
