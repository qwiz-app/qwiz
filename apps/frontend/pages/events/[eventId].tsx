/* eslint-disable react/jsx-no-undef */
import { Box, Container } from '@mantine/core';
import { EventHeader } from 'components/Event/EventHeader';
import EventStats from 'components/Event/EventStats';
import DashboardLayout from 'components/Layouts/DashboardLayout';

const EventPage = () => {
  return (
    <Box>
      <Container size="lg">
        <EventHeader />
        <EventStats />
      </Container>
    </Box>
  );
};

export default EventPage;

EventPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
