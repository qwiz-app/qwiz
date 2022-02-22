import { Avatar, Button } from '@mantine/core';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useQuery } from 'react-query';

import { User } from '@prisma/client';

const Index = () => {
  const { data: session, status } = useSession();

  const { data } = useQuery<User[]>(['user'], async () => {
    const response = await fetch('/api/user');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });

  return (
    <div className="homepage">
      <h1>Hello mc2 👋️</h1>
      <p>All users</p>
      {data?.map((user) => (
        <div
          key={user.id}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar src={user.image} alt={user.name} />
          {user.name === session?.user?.name ? 'You' : user.name}
        </div>
      ))}
      <div style={{ display: 'flex', gap: '.5rem' }}>
        {status === 'authenticated' ? (
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
