import {
  Box,
  Center,
  Group,
  Paper,
  RingProgress,
  SimpleGrid,
  Skeleton,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { useRouter } from 'next/router';
import { CircleWavyQuestion, Confetti, Queue } from 'phosphor-react';

export interface StatRing {
  label: string;
  stats: string;
  progress: number;
  color: string;
  icon: 'event' | 'quiz' | 'question';
  path: string;
}
interface StatsRingProps {
  data: StatRing[];
  loading?: boolean;
}

const icons = {
  event: Confetti,
  quiz: Queue,
  question: CircleWavyQuestion,
};

export const StatsRing = ({ data, loading }: StatsRingProps) => {
  const router = useRouter();

  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];
    return (
      <Skeleton radius="md" visible={loading} key={stat.label}>
        <UnstyledButton
          sx={() => ({ width: '100%' })}
          onClick={() => router.push(stat.path)}
        >
          <Paper withBorder radius="md" p="xs">
            <Group>
              <RingProgress
                size={80}
                roundCaps
                thickness={8}
                sections={[{ value: stat.progress, color: stat.color }]}
                label={
                  <Center>
                    <Icon size={24} weight="duotone" />
                  </Center>
                }
              />

              <Box>
                <Text
                  color="dimmed"
                  size="xs"
                  transform="uppercase"
                  weight={700}
                >
                  {stat.label}
                </Text>
                <Text weight={700} size="xl">
                  {stat.stats}
                </Text>
              </Box>
            </Group>
          </Paper>
        </UnstyledButton>
      </Skeleton>
    );
  });
  return (
    <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
      {stats}
    </SimpleGrid>
  );
};
