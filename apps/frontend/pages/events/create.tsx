import DashboardLayout from 'components/Layouts/DashboardLayout';
import { HomepageLayout } from 'components/PageLayouts/HomepageLayout';
import React from 'react';
import { Formik } from 'formik';
import { EventForm } from 'components/Cards/event/EventForm';
import { EventFormValues } from 'types/forms/EventFormValues';
import { eventSchema } from 'domain/util/validation';
import { useEventCreate } from 'hooks/api/events/use-event-create';
import { useRouter } from 'next/router';
import { paths } from 'paths';
import { Container } from '@mantine/core';

const EventsPage = () => {
  const { initialValues, handleSubmit } = useEventPage();

  return (
    <HomepageLayout>
      <Container size="sm">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={eventSchema}
        >
          <EventForm />
        </Formik>
      </Container>
    </HomepageLayout>
  );
};

const useEventPage = () => {
  const { mutateAsync: createEvent } = useEventCreate();
  const { push } = useRouter();

  const initialValues: EventFormValues = {
    name: '',
    location: '',
    description: '',
    price: null,
    teamCount: null,
    startDate: undefined,
    startTime: undefined,
    quizId: undefined,
  };

  const handleSubmit = async (values: EventFormValues) => {
    const { startDate: date, startTime: time, ...rest } = values;

    const startDate = date.toString().slice(0, 11) + time.toString().slice(11);

    await createEvent({ ...rest, startDate: new Date(startDate) });

    await push(paths.events());
  };

  return { initialValues, handleSubmit };
};

export default EventsPage;

EventsPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
