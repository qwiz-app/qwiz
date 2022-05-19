/* eslint-disable react/jsx-no-undef */
import { Container } from '@mantine/core';
import EventProfile from 'components/Event/EventProfile';
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
        <EventProfile event={event} loading={isLoading || isPlaceholderData} />
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
