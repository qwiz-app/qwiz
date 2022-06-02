import { Paper } from '@mantine/core';
import { useBreakpoints } from 'hooks/breakpoints';
import { useState } from 'react';
import { EventWithOwner } from 'types/api/event';
import RichText from './EventRichText';

interface Props {
  event: EventWithOwner;
  loading: boolean;
}

const EventDescription = ({ event, loading }: Props) => {
  // TODO: component isnt reactive after description update
  const [value, onChange] = useState(event.description);
  const { matches } = useBreakpoints();

  return (
    <Paper
      sx={() => ({
        minHeight: 300,
      })}
      radius="md"
      p={matches.max.sm ? 0 : 'md'}
    >
      <RichText
        sx={(t) => ({
          backgroundColor: 'inherit',
          border: 'none',
          fontSize: 16,
        })}
        radius={0}
        readOnly
        value={value}
        onChange={onChange}
      />
    </Paper>
  );
};

export default EventDescription;
