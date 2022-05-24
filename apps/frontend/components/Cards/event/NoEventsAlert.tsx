import { Alert, Button, Stack } from '@mantine/core';
import { useAppColorscheme } from 'hooks/colorscheme';
import { useCreateEventCheck } from 'hooks/use-create-event-check';

export const NoEventsAlert = () => {
  const { isDark } = useAppColorscheme();
  const { navigateToCreateEvent } = useCreateEventCheck();

  return (
    <Alert
      title="No events found"
      color={isDark ? 'gray' : 'dark'}
      sx={(t) => ({
        maxWidth: 500,
        backgroundColor: !isDark && t.colors.gray[2],
      })}
    >
      <Stack align="start">
        You haven&rsquo;t created any events yet.
        <Button
          ml="auto"
          color="orange"
          variant={isDark ? 'light' : 'filled'}
          onClick={navigateToCreateEvent}
        >
          Create your first event
        </Button>
      </Stack>
    </Alert>
  );
};
