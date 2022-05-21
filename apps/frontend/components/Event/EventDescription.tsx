import { Paper } from '@mantine/core';
import { useState } from 'react';
import { EventWithOwner } from 'types/api/event';
import RichText from './EventRichText';

interface Props {
  event: EventWithOwner;
  loading: boolean;
}

const EventDescription = ({ event, loading }: Props) => {
  /* TODO: component isnt reactive after description update */
  const [value, onChange] = useState(event.description);

  return (
    <Paper
      sx={() => ({
        minHeight: 400,
      })}
      radius="md"
      p="xl"
    >
      <RichText
        sx={(t) => ({
          backgroundColor: 'inherit',
          border: 'none',
          fontSize: 16,
        })}
        readOnly
        value={value}
        onChange={onChange}
      />
    </Paper>
  );
};

export default EventDescription;
