import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  createStyles,
  Group,
  Text,
  Tooltip,
} from '@mantine/core';
import { Role } from '@prisma/client';
import { ArrowsClockwise, At } from 'phosphor-react';
import { SyntheticEvent } from 'react';

const useStyles = createStyles((theme) => ({
  icon: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[3]
        : theme.colors.gray[5],
  },
}));

interface Props {
  avatar: string;
  name: string;
  role: string;
  email: string;
  onGenerateAvatar?: () => void;
  onResetAvatar?: () => void;
}

export const UserModalInfoCard = ({
  avatar,
  name,
  role,
  email,
  onGenerateAvatar,
  onResetAvatar,
}: Props) => {
  const { classes } = useStyles();

  const resetAvatarHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    onResetAvatar();
  };

  const tooltipLabel = () => {
    let msg = 'Generate';
    if (onResetAvatar) {
      msg += ' (right-click to reset)';
    }
    return msg;
  };

  return (
    <Group noWrap align="content-start">
      <Box sx={() => ({ position: 'relative' })}>
        <Avatar src={avatar} size={94} radius={1000} />
        {onGenerateAvatar && (
          <Tooltip
            label={tooltipLabel()}
            position="right"
            sx={() => ({
              position: 'absolute',
              bottom: '-.15rem',
              right: '.3rem',
            })}
          >
            <ActionIcon
              size="md"
              radius="xl"
              variant="filled"
              onClick={onGenerateAvatar}
              onContextMenu={resetAvatarHandler}
            >
              <ArrowsClockwise weight="bold" />
            </ActionIcon>
          </Tooltip>
        )}
      </Box>
      <div>
        <Box mb={4}>
          <Badge
            size="sm"
            color={role === Role.ORGANIZATION ? 'violet' : 'yellow'}
          >
            {role}
          </Badge>
        </Box>

        <Text size="lg" weight={500}>
          {name}
        </Text>

        <Group noWrap spacing={8} mt={3}>
          <At size={16} className={classes.icon} />
          <Text size="sm" color="dimmed">
            {email}
          </Text>
        </Group>
      </div>
    </Group>
  );
};
