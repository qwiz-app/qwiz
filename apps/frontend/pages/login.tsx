import {
  Avatar,
  Button,
  Group,
  Paper,
  Skeleton,
  Text,
  Title,
} from '@mantine/core';
import AuthLayout from 'components/layout/AuthLayout';
import { useCurrentSession } from 'hooks/session';
import { useUsers, useUser } from 'hooks/users/users';
import { signOut, signIn } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react';

const Login = (props) => {
  const { isAuthenticated, user: currentUser } = useCurrentSession();
  const { data: users, error } = useUsers();
  const [id, setId] = useState<string>(null);

  const {
    data: selectedUser,
    isSuccess,
    error: selectedUserError,
    isLoading: selectedUserLoading,
  } = useUser(id);

  return (
    <Group>
      <Group className="homepage" direction="column" align="center">
        <Title order={2}>Hello mc2 👋️</Title>
        <p>All users</p>
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
        <Group>
          {isAuthenticated ? (
            <Button onClick={() => signOut()} variant="filled">
              Sign out
            </Button>
          ) : (
            <Button onClick={() => signIn()} variant="filled">
              Sign in
            </Button>
          )}
          <Link passHref href="/demo">
            <Button variant="light">Demo</Button>
          </Link>
        </Group>
      </Group>
      <Skeleton
        visible={selectedUserLoading}
        color="pink"
        sx={() => ({ marginTop: '1rem' })}
      >
        <Paper
          padding="md"
          sx={(theme) => ({
            display: 'block',
          })}
        >
          {isSuccess ? (
            <div>
              <Text size="sm">{selectedUser.email}</Text>
            </div>
          ) : (
            <p>{selectedUserError?.response.data.message}</p>
          )}
        </Paper>
      </Skeleton>
    </Group>
  );
};

export default Login;

Login.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
