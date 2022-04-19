/* eslint-disable @typescript-eslint/no-empty-function */
import { createStyles, Group, Stack } from '@mantine/core';
import { Role } from '@prisma/client';
import { AnimatedWrapper } from 'components/Animation/AnimatedWrapper';
import { useEffect } from 'react';
import { UserRoleCard } from './UserRoleCard';

type Props = {
  selectedRole: Role | null;
  onSelectRole: (role: Role) => void;
};

export const UserRoleModalStep1 = ({ selectedRole, onSelectRole }: Props) => {
  const { classes } = useStyles();

  useEffect(() => {
    console.log('modal role', selectedRole);
  }, [selectedRole]);

  const roles = [
    {
      image:
        'https://media.istockphoto.com/photos/empty-restaurant-interior-picture-id1224771205?k=20&m=1224771205&s=612x612&w=0&h=KOqgtFbNtE6WP4ACwkFtIq0KCEq0MljBs5PC5xsyryg=',
      title: 'Organization',
      role: Role.ORGANIZER,
    },
    {
      image:
        'https://www.watfordobserver.co.uk/resources/images/6782556.jpg?display=1&htype=0&type=responsive-gallery',
      title: 'Attendee',
      role: Role.ATTENDEE,
    },
  ];

  return (
    <div>
      <Group>
        {roles.map((item) => (
          <UserRoleCard
            selected={selectedRole === item.role}
            onSelect={onSelectRole}
            key={item.title}
            animatedWrapper={
              <AnimatedWrapper layoutId="roles" className={classes.wrapper} />
            }
            {...item}
          />
        ))}
      </Group>
      <Stack>
        step1 role: {selectedRole}
        {selectedRole === Role.ORGANIZER && <div>You are an organization</div>}
        {selectedRole === Role.ATTENDEE && <div>You are an attendee</div>}
      </Stack>
    </div>
  );
};

const useStyles = createStyles((theme) => ({
  wrapper: {
    borderRadius: theme.radius.sm,
    borderWidth: 8,
    borderStyle: 'solid',
    borderColor: theme.colors.gray[9],
    position: 'absolute',
    zIndex: 1,
    inset: 0,
    margin: 0,
    padding: 0,
  },
}));
