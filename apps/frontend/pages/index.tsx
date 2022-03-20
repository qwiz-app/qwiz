import { Avatar, Box, Group, Text } from '@mantine/core';
import DashboardLayout from 'components/layout/DashboardLayout';
import { Button } from 'components/UI/Button/Button';
import { useCurrentSession } from 'hooks/session';
import { useUser, useUsers } from 'hooks/users/users';
import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
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
            />
            {user.name === currentUser?.name ? 'You' : user.name}
          </div>
        ))}
        {error && <p>{error.response.data?.message}</p>}
        <Group spacing={8}>
          {isAuthenticated ? (
            <Button onClick={() => signOut()} variant="filled">
              Sign out
            </Button>
          ) : (
            <Button onClick={() => signIn()} variant="filled">
              Sign in
            </Button>
          )}
          <Link passHref href="/">
            <Button variant="light">Home</Button>
          </Link>
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
