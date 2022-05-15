import { Box, Skeleton } from '@mantine/core';
import { useBreakpoints } from 'hooks/breakpoints';
import { EventWithOrganization } from 'types/event';
import EventDescription from './EventDescription';
import EventMap from './EventMap';

interface Props {
  event: EventWithOrganization;
  loading: boolean;
}

const EventAdditionalInfo = ({ event, loading }: Props) => {
  const { matches } = useBreakpoints();

  const content = loading ? (
    <>
      <Skeleton
        visible
        sx={() => ({
          flex: 2,
        })}
        width="100%"
        height={400}
        radius="md"
      />
      <Skeleton
        visible
        sx={() => ({
          flex: 1,
        })}
        height={250}
        radius="md"
      />
    </>
  ) : (
    <>
      <Box sx={() => ({ flex: 2 })}>
        <EventDescription event={event} loading={loading} />
      </Box>
      <Box sx={() => ({ flex: 1 })} mt={matches.max.xl && 16}>
        <EventMap event={event} loading={loading} />
      </Box>
    </>
  );

  return (
    <Box
      sx={() => ({
        width: '100%',
        display: matches.max.xl ? 'block' : 'flex',
        alignItems: 'start',
        gap: 16,
      })}
    >
      {content}
    </Box>
  );
};

export default EventAdditionalInfo;
