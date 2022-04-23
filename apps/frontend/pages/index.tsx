import { Avatar, Box, Button, Group, Text } from '@mantine/core';
import DashboardLayout from 'components/Layouts/DashboardLayout';
import { useUserRoleModal } from 'components/Modals/UserRoleModal/use-user-role-modal';
import { useCurrentSession } from 'hooks/api/session';
import { useUser, useUsers } from 'hooks/api/users';
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

  const { launchUserRoleModal } = useUserRoleModal();

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
          <Button variant="light" color="pink" onClick={launchUserRoleModal}>
            Role modal
          </Button>
        </Group>
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
