import {
  Avatar,
  Badge,
  Box,
  Button,
  Group,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import DashboardLayout from 'components/Layouts/DashboardLayout';
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

  return (
    <Group direction="column">
      <Stack align="center" spacing={24}>
        <Title order={5}>All users</Title>
        {users?.map((user) => (
          <Stack align="center" key={user.id} spacing={2}>
            <Avatar
              onClick={() => setId(user.id)}
              src={user.image}
              alt={user.name}
              radius="xl"
            />
            <Text>{user.email === currentUser?.email ? 'You' : user.name}</Text>
            <Badge>{user.role ?? 'No role assigned'}</Badge>
          </Stack>
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
        </Group>
      </Stack>
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
