import { Alert, Button, Group, Stack, Text } from '@mantine/core';
import { useAppColorscheme } from 'hooks/colorscheme';
import { useRouter } from 'next/router';
import { paths } from 'paths';
import { UsersThree } from 'phosphor-react';

export const NoTeamsAlert = () => {
  const router = useRouter();
  const { isDark } = useAppColorscheme();

  const navigateToTeamCreate = () => {
    router.push(paths.teamNew());
  };

  return (
    <Alert
      title={
        <Group spacing={8}>
          <UsersThree size={20} weight="duotone" />
          <Text size="sm">No teams found</Text>
        </Group>
      }
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
