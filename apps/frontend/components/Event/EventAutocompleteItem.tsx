import {
  Avatar, Box, Group, SelectItemProps,
  Text
} from '@mantine/core';
import { Quiz } from '@prisma/client';
import { formatDate } from 'lib/utils';
import { Star } from 'phosphor-react';
import { forwardRef } from 'react';

interface ItemProps extends Quiz, SelectItemProps {
  id: string;
  description: string;
  label: string;
}

export const EventAutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
  (
    { description, updatedAt, thumbnail, value, label, ...others }: ItemProps,
    ref
  ) => (
    <div ref={ref} {...others}>
      <Group noWrap sx={() => ({ width: '100%' })}>
        <Avatar size="md" src={thumbnail} alt="thumbnail" sx={() => ({})}>
          <Star size={24} weight="duotone" />
        </Avatar>

        <Box sx={() => ({ width: '100%' })}>
          <Group position="apart">
            <Text>{label}</Text>
            <Text size="xs" color="dimmed">
              {formatDate(updatedAt)}
            </Text>
          </Group>
          <Text size="xs" color="dimmed">
            {description || 'No description provided'}
          </Text>
        </Box>
      </Group>
    </div>
  )
);