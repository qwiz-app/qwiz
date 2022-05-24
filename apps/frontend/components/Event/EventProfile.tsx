import { Stack } from '@mantine/core';
import { EventWithOwner } from 'types/api/event';
import EventAdditionalInfo from './EventAdditionalInfo';
import { EventHeader } from './EventHeader';
import EventStats from './EventStats';

interface Props {
  event: EventWithOwner;
  loading: boolean;
}

const EventProfile = ({ event, loading }: Props) => {
  return (
    <Stack align="stretch">
      <EventHeader event={event} loading={loading} />
      <EventStats event={event} loading={loading} />
      <EventAdditionalInfo event={event} loading={loading} />
    </Stack>
  );
};

export default EventProfile;
