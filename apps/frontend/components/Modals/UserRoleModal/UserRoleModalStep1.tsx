import { Button, createStyles, Group } from '@mantine/core';
import { Role } from '@prisma/client';
import { AnimatedWrapper } from 'components/Animation/AnimatedWrapper';
import { useBreakpoints } from 'hooks/breakpoints';
import { useAssignRole } from 'store/use-assign-role';
import { UserRoleCard } from './UserRoleCard';

interface Props {
  onContinue: () => void;
}

export const UserRoleModalStep1 = ({ onContinue }: Props) => {
  const { classes } = useStyles();
  const { matches } = useBreakpoints();
  const { selectedRole, setSelectedRole } = useAssignRole();

  const roles = [
    {
      image:
        'https://media.istockphoto.com/photos/empty-restaurant-interior-picture-id1224771205?k=20&m=1224771205&s=612x612&w=0&h=KOqgtFbNtE6WP4ACwkFtIq0KCEq0MljBs5PC5xsyryg=',
      title: 'Organization',
      role: Role.ORGANIZATION,
    },
    {
      image:
        'https://www.watfordobserver.co.uk/resources/images/6782556.jpg?display=1&htype=0&type=responsive-gallery',
      title: 'Attendee',
      role: Role.ATTENDEE,
    },
  ];

  return (
    <>
      <Group direction={matches.max.sm ? 'column' : 'row'} position="center">
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
      <Group position="right">
        <Button className="mt-3" onClick={onContinue}>
          Continue
        </Button>
      </Group>
    </>
  );
};

const useStyles = createStyles((theme) => {
  const { selectedRole } = useAssignRole();

  return {
    wrapper: {
      borderRadius: theme.radius.sm,
      borderWidth: 4,
      borderStyle: 'solid',
      borderColor:
        // TODO: correct color aligned with mantine theme
        selectedRole === Role.ORGANIZATION
          ? theme.colors.violet[5]
          : theme.colors.yellow[4],
      position: 'absolute',
      inset: 0,
    },
  };
});
