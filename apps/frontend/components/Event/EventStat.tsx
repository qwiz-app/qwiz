import { Box, Group, Paper, Text } from '@mantine/core';
import { ReactNode } from 'react';

interface Props {
  label: string;
  value: string;
  icon: ReactNode;
}

export const EventStat = ({ label, value, icon }: Props) => {
  return (
    <Paper
      radius="md"
      px="md"
      py="sm"
      sx={() => ({
        height: '100%',
      })}
    >
      <Group
        align="center"
        sx={() => ({
          height: '100%',
        })}
        spacing="sm"
        noWrap
      >
        <Box
          sx={(t) => ({
            flexShrink: 0,
          })}
        >
          {icon}
        </Box>
        <Box>
          <Text
            color="dimmed"
            sx={(t) => ({
              fontSize: 10,
            })}
            lineClamp={1}
            transform="uppercase"
            weight={700}
          >
            {label}
          </Text>
          <Text weight={700} lineClamp={1} size="md">
            {value}
          </Text>
        </Box>
      </Group>
    </Paper>
  );
};
