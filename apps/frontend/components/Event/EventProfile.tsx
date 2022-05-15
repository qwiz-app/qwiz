import { Stack } from '@mantine/core';
import { EventWithOrganization } from 'types/event';
import EventAdditionalInfo from './EventAdditionalInfo';
import { EventHeader } from './EventHeader';
import EventStats from './EventStats';

interface Props {
  event: EventWithOrganization;
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
