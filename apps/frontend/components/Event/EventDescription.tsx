import { Paper } from '@mantine/core';
import { useState } from 'react';
import { EventWithOrganization } from 'types/event';
import RichText from './EventRichText';

interface Props {
  event: EventWithOrganization;
  loading: boolean;
}

const EventDescription = ({ event, loading }: Props) => {
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
