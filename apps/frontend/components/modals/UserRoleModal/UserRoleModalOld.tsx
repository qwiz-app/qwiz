/* eslint-disable @typescript-eslint/no-empty-function */
import { Box, createStyles, Group, Modal, Stack } from '@mantine/core';
import { Role } from '@prisma/client';
import { AnimatedWrapper } from 'components/Animation/AnimatedWrapper';
import { useAppColorscheme } from 'hooks/colorscheme';
import { useState } from 'react';
import { UserRoleCard } from './UserRoleCard';

type Props = {
  opened: boolean;
  closable?: boolean;
  onClose?: () => void;
};

export const UserRoleModalOld = ({ opened, onClose, closable }: Props) => {
  const { theme, isDark } = useAppColorscheme();

  const { classes } = useStyles();

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

  const [selectedRole, setSelectedRole] = useState<Role>(null);

  return (
    <Modal
      overlayColor={isDark ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.95}
      title="Who are you creating an account for?"
      opened={opened}
      onClose={closable ? onClose : () => {}}
      withCloseButton={false}
      withinPortal
      centered
      size="md"
      padding="xl"
      radius="sm"
      styles={{
        modal: {},
      }}
    >
      <Stack>
        <Box>
          <Group>
            {roles.map((item) => (
              <UserRoleCard
                selected={selectedRole === item.role}
                onSelect={setSelectedRole}
                key={item.title}
                animatedWrapper={
                  <AnimatedWrapper
                    layoutId="roles"
                    className={classes.wrapper}
                  />
                }
                {...item}
              />
            ))}
          </Group>
        </Box>
        <Stack>
          {selectedRole === Role.ORGANIZER && (
            <div>You are an organization</div>
          )}
          {selectedRole === Role.ATTENDEE && <div>You are an attendee</div>}
        </Stack>
      </Stack>
    </Modal>
  );
};

UserRoleModalOld.defaultProps = {
  closable: false,
  onClose: () => {},
};

const useStyles = createStyles((theme) => ({
  wrapper: {
    borderRadius: theme.radius.sm,
    borderWidth: 4,
    borderStyle: 'solid',
    borderColor: theme.colors.orange[9],
    position: 'absolute',
    zIndex: 1,
    inset: 0,
    margin: 0,
    padding: 0,
  },
}));
