import { Avatar, Button, Paper, Skeleton, Text } from '@mantine/core';
import { useCurrentSession } from 'hooks/session';
import { useUser, useUsers } from 'hooks/users/users';
import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

const Index = () => {
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
    <>
      <div className="homepage">
        <h1>Hello mc2 👋️</h1>
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
        <div style={{ display: 'flex', gap: '.5rem' }}>
          {isAuthenticated ? (
            <Button onClick={() => signOut()} variant="subtle" radius="xs">
              Sign out
            </Button>
          ) : (
            <Button onClick={() => signIn()} variant="filled" radius="xs">
              Sign in
            </Button>
          )}
          <Link href="/demo" passHref>
            <Button radius="xs" color="gray" variant="subtle">
              Demo
            </Button>
          </Link>
        </div>
      </div>
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
    </>
  );
};

export default Index;
