import { Avatar, Badge, Box, createStyles, Group, Text } from '@mantine/core';
import { At } from 'phosphor-react';

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
}

export const UserModalInfoCard = ({ avatar, name, role, email }: Props) => {
  const { classes } = useStyles();
  return (
    <Group noWrap align="content-start">
      <Avatar src={avatar} size={94} radius="md" />
      <div>
        <Box mb={4}>
          <Badge size="sm" sx={{ textTransform: 'uppercase' }} color="green">
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
