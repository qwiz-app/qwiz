/* eslint-disable react/jsx-no-undef */
import { Container, Stack } from '@mantine/core';
import EventAdditionalInfo from 'components/Event/EventAdditionalInfo';
import { EventHeader } from 'components/Event/EventHeader';
import EventStats from 'components/Event/EventStats';
import DashboardLayout from 'components/Layouts/DashboardLayout';
import { useEvent } from 'hooks/api/events/use-event';
import { useRouter } from 'next/router';

const EventPage = () => {
  const router = useRouter();
  const {
    data: event,
    isLoading,
    isPlaceholderData,
  } = useEvent(router.query.eventId as string);

  const hasEventOrIsPlacholder = isPlaceholderData || event;

  if (!hasEventOrIsPlacholder) {
    router.push('/404');
    return null;
  }

  return (
    <Container size="lg">
      {hasEventOrIsPlacholder ? (
        <Stack align="stretch">
          <EventHeader event={event} loading={isLoading || isPlaceholderData} />
          <EventStats event={event} loading={isLoading || isPlaceholderData} />
          <EventAdditionalInfo
            event={event}
            loading={isLoading || isPlaceholderData}
          />
        </Stack>
      ) : (
        // at this point it will never show
        <div>TODO: No event found</div>
      )}
    </Container>
  );
};

export default EventPage;

EventPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
