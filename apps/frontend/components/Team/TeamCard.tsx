import {
    Avatar,
    AvatarsGroup,
    Box,
    Group,
    Paper,
    Stack,
    Text
} from '@mantine/core';
import { useBreakpoints } from 'hooks/breakpoints';
import { formatDate } from 'lib/utils';
import { At } from 'phosphor-react';
import { TeamFull } from 'types/api/teams';

interface Props {
  team: TeamFull;
}

const TeamCard = ({ team }: Props) => {
  const { matches } = useBreakpoints();

  return (
    <Paper withBorder radius="md" sx={{ overflow: 'hidden' }}>
      <Group noWrap>
        {matches.min.sm && <Avatar src={team.image} size={164} radius={0} />}
        <Box p="md">
          <Group noWrap>
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
