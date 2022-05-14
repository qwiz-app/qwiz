/* eslint-disable react/jsx-no-undef */
import { Box, Container } from '@mantine/core';
import { EventHeader } from 'components/Event/EventHeader';
import EventStats from 'components/Event/EventStats';
import DashboardLayout from 'components/Layouts/DashboardLayout';
import { useEvent } from 'hooks/api/events/use-event';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const EventPage = () => {
  const router = useRouter();
  const {
    data: event,
    isLoading,
    isPlaceholderData,
  } = useEvent(router.query.eventId as string);

  useEffect(() => {
    console.log(event);
  }, [event]);

  const hasEventOrIsPlacholder = isPlaceholderData || event;

  return (
    <Box>
      <Container size="lg">
        {hasEventOrIsPlacholder ? (
          <>
            <EventHeader
              event={event}
              loading={isLoading || isPlaceholderData}
            />
            <EventStats
              event={event}
              loading={isLoading || isPlaceholderData}
            />
          </>
        ) : (
          <div>TODO: No event found</div>
        )}
      </Container>
    </Box>
  );
};

export default EventPage;

EventPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
