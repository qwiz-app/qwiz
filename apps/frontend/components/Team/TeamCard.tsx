import {
  ActionIcon,
  Avatar,
  AvatarsGroup,
  Box,
  Group,
  Paper,
  Stack,
  Text,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useTeamDelete } from 'hooks/api/teams';
import { useBreakpoints } from 'hooks/breakpoints';
import { useDeleteConfirmModal } from 'hooks/use-delete-confirm-modal';
import { formatDate } from 'lib/utils';
import { At, X } from 'phosphor-react';
import { TeamFull } from 'types/api/teams';

interface Props {
  team: TeamFull;
}

const TeamCard = ({ team }: Props) => {
  const { matches } = useBreakpoints();
  const { mutate: deleteTeam } = useTeamDelete(team.id);

  const openDeleteConfirmModal = useDeleteConfirmModal({
    onConfirm: () => {
      deleteTeam();
      showNotification({
        title: 'Team deleted',
        message: 'Team has successfully been deleted',
        color: 'green',
      });
    },
    deletedEntity: 'team',
  });

  return (
    <Paper withBorder radius="md" sx={{ overflow: 'hidden' }}>
      <Group noWrap sx={{ width: '100%' }}>
        {matches.min.sm && <Avatar src={team.image} size={164} radius={0} />}
        <Box p="md" sx={{ width: '100%' }}>
          <Group noWrap position="apart" align="start" sx={{ width: '100%' }}>
            <Group>
              {matches.max.sm && (
                <Avatar src={team.image} size={64} radius="sm" />
              )}
              <Stack spacing={4} justify="center">
                <Text
                  size="xs"
                  sx={{ textTransform: 'uppercase' }}
                  weight={700}
                  color="dimmed"
                >
                  {formatDate(team.createdAt)}
                </Text>
                <Text lineClamp={1} size="xl" weight={500}>
                  {team.name}
                </Text>
              </Stack>
            </Group>
            <ActionIcon color="gray" onClick={openDeleteConfirmModal}>
              <X size={18} weight="bold" />
            </ActionIcon>
          </Group>

          <Group noWrap spacing={4} mt={matches.max.sm ? 12 : 4}>
            <At size={16} weight="duotone" />
            <Text size="xs" color="dimmed" lineClamp={1}>
              {team.admin.user.email}
            </Text>
          </Group>

          <AvatarsGroup mt={10} limit={3}>
            {team.members.map((member) => (
              <Avatar src={member.user.image} key={member.id} color="orange" />
            ))}
          </AvatarsGroup>
        </Box>
      </Group>
    </Paper>
  );
};

export default TeamCard;
