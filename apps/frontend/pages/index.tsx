import { Button } from '@mantine/core';
import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useQuery } from 'react-query';

const Index = () => {
  const { data, isLoading } = useQuery(['user'], async () => {
    const response = await fetch('/api/user');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });

  return (
    <div className="homepage">
      <h1>Hello mc2 👋️ {JSON.stringify(data)}</h1>
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
        <Link href="/demo">
          <Button radius="xs" color="gray" variant="subtle">
            Demo
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
