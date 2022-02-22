import { Avatar, Button } from '@mantine/core';
import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useQuery } from 'react-query';

import { User } from '@prisma/client';

const Index = () => {
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
      <p>Users</p>
      {data?.map((user) => (
        <div key={user.id}>
          <Avatar src={user.image} alt={user.name} />
          {user.name}
        </div>
      ))}
      <div style={{ display: 'flex', gap: '.5rem' }}>
        <Button
          onClick={() => signIn()}
          variant="filled"
          loading={false}
          radius="xs"
          // style={{ background: 'black' }}
        >
          Sign in
        </Button>
        <Button onClick={() => signOut()} variant="subtle" radius="xs">
          Sign out
        </Button>
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
