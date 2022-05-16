import { Indicator } from '@mantine/core';
import { Role } from '@prisma/client';
import { ReactNode, useMemo } from 'react';

interface Props {
  children: ReactNode;
  role: Role;
  size?: number;
  offset?: number;
}

export const AvatarRoleIndicator = ({
  children,
  role,
  size = 16,
  offset = 5,
}: Props) => {
  const color = useMemo(() => {
    switch (role) {
      case Role.ADMIN:
        return 'red';
      case Role.ORGANIZATION:
        return 'indigo';
      case Role.ATTENDEE:
        return 'yellow';
      default:
        return 'yellow';
    }
  }, [role]);

  return (
    <Indicator color={color} size={size} offset={offset} radius="lg" withBorder>
      {children}
    </Indicator>
  );
};
