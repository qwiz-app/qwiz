import { Avatar, Box, Button, Group, Text } from '@mantine/core';
import { useModals } from '@mantine/modals';
import DashboardLayout from 'components/Layouts/DashboardLayout';
import { useUserRoleModal } from 'components/modals/UserRoleModal/UserRoleModal';
import { UserRoleModalOld } from 'components/modals/UserRoleModal/UserRoleModalOld';
import { useCurrentSession } from 'hooks/session';
import { useUser, useUsers } from 'hooks/users/users';
import { signIn, signOut } from 'next-auth/react';
import { useState } from 'react';

const IndexPage = () => {
  const { isAuthenticated, user: currentUser } = useCurrentSession();
  const { data: users, error } = useUsers();
  const [id, setId] = useState<string>(null);
  const {
    data: selectedUser,
    isSuccess,
    isError,
    error: selectedUserError,
  } = useUser(id);

  const signOutHandler = () =>
    signOut({
      callbackUrl: '/signin?signOut=true',
    });

  const [roleModalOpened, setRoleModalOpened] = useState(false);

  const modals = useModals();

  const { launchUserRoleModal } = useUserRoleModal();

  const openMultiStepModal = () =>
    modals.openConfirmModal({
      title: 'Who are you creating an account for?',
      closeOnConfirm: false,
      labels: { confirm: 'Next modal', cancel: 'Close modal' },
      children: (
        <Text size="sm">
          This action is so important that you are required to confirm it with a
          modal. Please click one of these buttons to proceed.
        </Text>
      ),
      onConfirm: () =>
        modals.openConfirmModal({
          title: 'This is modal at second layer',
          labels: { confirm: 'Close modal', cancel: 'Back' },
          closeOnConfirm: false,
          children: (
            <Text size="sm">
              When this modal is closed modals state will revert to first modal
            </Text>
          ),
          onConfirm: () => modals.closeAll(),
        }),
    });

  return (
    <Group direction="column">
      <Group direction="column" align="center">
        <Text size="xl">All users</Text>
        {users?.map((user) => (
          <div
            key={user.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar
              onClick={() => setId(user.id)}
              src={user.image}
              alt={user.name}
              radius="sm"
            />
            {user.name === currentUser?.name ? 'You' : user.name}
          </div>
        ))}
        {error && <p>{error.response.data?.message}</p>}
        <Group spacing={8}>
          {isAuthenticated ? (
            <Button onClick={signOutHandler} variant="filled">
              Sign out
            </Button>
          ) : (
            <Button onClick={() => signIn()} variant="filled">
              Sign in
            </Button>
          )}
          <Button
            onClick={() => setRoleModalOpened(true)}
            variant="light"
            color="grape"
          >
            Open modal
          </Button>
          <Button variant="light" color="blue" onClick={openMultiStepModal}>
            Multi step modal
          </Button>
          <Button variant="light" color="pink" onClick={launchUserRoleModal}>
            Role modal
          </Button>
        </Group>
        <UserRoleModalOld
          opened={roleModalOpened}
          onClose={() => setRoleModalOpened(false)}
          closable
        />
      </Group>
      <Box mt={16}>
        <Text size="sm" color={isError ? 'red' : 'currentColor'}>
          {isSuccess
            ? selectedUser.email
            : selectedUserError?.response.data.message}
        </Text>
      </Box>
    </Group>
  );
};

export default IndexPage;

IndexPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
