import { Box, Group, Paper, Text } from '@mantine/core';
import { ReactNode } from 'react';

interface Props {
  label: string;
  value: string;
  icon: ReactNode;
}

export const EventStat = ({ label, value, icon }: Props) => {
  return (
    <Paper radius="md" px="md" py="sm">
      <Group
        align="center"
        sx={() => ({
          height: '100%',
        })}
        spacing="sm"
      >
        {icon}
        <Box>
          <Text
            color="dimmed"
            sx={() => ({
              fontSize: 10,
            })}
            transform="uppercase"
            weight={700}
          >
            {label}
          </Text>
          <Text weight={700} size="md">
            {value}
          </Text>
        </Box>
      </Group>
    </Paper>
  );
};
