import React, { memo } from 'react';
import { useCardStyles } from 'components/Cards/use-card-styles';
import { Card, Center, createStyles, Stack, Text } from '@mantine/core';
import cn from 'classnames';
import { Plus } from 'phosphor-react';
import Link from 'next/link';
import { paths } from '../../../paths';

type Props = Record<string, never>;

export const EventCreateCard = memo(function EventCreateCard(props: Props) {
  const { classes } = useStyles();
  const { classes: classesCard } = useCardStyles();

  return (
    <Link href={paths.eventsCreate()}>
      <Stack spacing={8}>
        <Card
          radius="md"
          withBorder
          className={cn(classesCard.card, classes.card)}
        >
          <Center sx={() => ({ height: '100%' })}>
            <Plus size={40} weight="duotone" />
          </Center>
        </Card>
        <Text weight={600} ml={4}>
          Blank
        </Text>
      </Stack>
    </Link>
  );
});

const useStyles = createStyles((theme, params, getRef) => ({
  card: {
    aspectRatio: '16/9',
    cursor: 'pointer',

    '&:hover': {
      background:
        theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    },
  },
}));
