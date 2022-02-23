import { Avatar, Button } from '@mantine/core';
import { useCurrentSession } from 'hooks/session';
import { useUsers } from 'hooks/users/users';
import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useEffect } from 'react';

const Index = () => {
  const { isAuthenticated, user: currentUser } = useCurrentSession();
  const { data: users, error } = useUsers();

  useEffect(() => {
    if (error) {
      console.warn('Users error', error.response);
    }
  }, [error]);

  return (
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
          <Avatar src={user.image} alt={user.name} />
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
  );
};

export default Index;
