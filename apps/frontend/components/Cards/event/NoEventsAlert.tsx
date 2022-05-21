import { Alert, Button, Stack } from '@mantine/core';
import { useAppColorscheme } from 'hooks/colorscheme';
import { useRouter } from 'next/router';
import { paths } from 'paths';

export const NoEventsAlert = () => {
  const { isDark } = useAppColorscheme();
  const router = useRouter();

  return (
    <Alert
      title="No events found"
      color={isDark ? 'gray' : 'dark'}
      sx={(t) => ({
        maxWidth: '500px',
        backgroundColor: !isDark && t.colors.gray[2],
      })}
    >
      <Stack align="start">
        You haven&rsquo;t created any events yet.
        <Button
          ml="auto"
          color="indigo"
          variant={isDark ? 'light' : 'filled'}
          onClick={() => router.push(paths.eventCreate())}
        >
          Create your first event
        </Button>
      </Stack>
    </Alert>
  );
};
