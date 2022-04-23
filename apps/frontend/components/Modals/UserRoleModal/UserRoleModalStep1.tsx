import { createStyles, Group } from '@mantine/core';
import { Role } from '@prisma/client';
import { AnimatedWrapper } from 'components/Animation/AnimatedWrapper';
import { useEffect } from 'react';
import { useAssignRole } from 'store/use-assign-role';
import { UserRoleCard } from './UserRoleCard';

export const UserRoleModalStep1 = () => {
  const { classes } = useStyles();
  const { selectedRole, setSelectedRole } = useAssignRole();

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
    <Group>
      {roles.map((item) => (
        <UserRoleCard
          selected={selectedRole === item.role}
          onSelect={setSelectedRole}
          key={item.title}
          animatedWrapper={
            <AnimatedWrapper layoutId="roles" className={classes.wrapper} />
          }
          {...item}
        />
      ))}
    </Group>
  );
};

const useStyles = createStyles((theme) => ({
  wrapper: {
    borderRadius: theme.radius.sm,
    borderWidth: 6,
    borderStyle: 'solid',
    borderColor: theme.colors.yellow[6],
    position: 'absolute',
    zIndex: 1,
    inset: 0,
    margin: 0,
    padding: 0,
  },
}));
