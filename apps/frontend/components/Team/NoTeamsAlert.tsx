import { Alert, Button, Stack } from '@mantine/core';
import { useAppColorscheme } from 'hooks/colorscheme';
import { useRouter } from 'next/router';
import { paths } from 'paths';

export const NoTeamsAlert = () => {
  const router = useRouter();
  const { isDark } = useAppColorscheme();

  const navigateToTeamCreate = () => {
    router.push(paths.teamNew());
  };

  return (
    <Alert
      title="No teams found"
      color={isDark ? 'gray' : 'dark'}
      sx={(t) => ({
        maxWidth: 500,
        backgroundColor: !isDark && t.colors.gray[2],
      })}
    >
      <Stack align="start">
        You haven&rsquo;t created any teams yet.
        <Button
          ml="auto"
          color="orange"
          variant={isDark ? 'light' : 'filled'}
          onClick={navigateToTeamCreate}
        >
          Create your first team
        </Button>
      </Stack>
    </Alert>
  );
};
