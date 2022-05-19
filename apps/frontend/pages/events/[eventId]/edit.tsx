import { Container } from '@mantine/core';
import { EventForm } from 'components/Cards/event/EventForm';
import DashboardLayout from 'components/Layouts/DashboardLayout';
import { HomepageLayout } from 'components/PageLayouts/HomepageLayout';
import { eventSchema } from 'domain/util/validation';
import { Formik } from 'formik';
import { useEvent } from 'hooks/api/events/use-event';
import { useEventUpdate } from 'hooks/api/events/use-event-update';
import { useFileUpload } from 'hooks/use-flle-upload';
import { useRouter } from 'next/router';
import { paths } from 'paths';
import { EventFormValues } from 'types/forms/EventFormValues';

const EventsPage = () => {
  const { initialValues, handleSubmit, fileUpload, imgUrl } = useEventPage();

  return (
    <HomepageLayout>
      <Container size="sm">
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={eventSchema}
        >
          <EventForm fileUpload={fileUpload} action="edit" imgUrl={imgUrl} />
        </Formik>
      </Container>
    </HomepageLayout>
  );
};

const useEventPage = () => {
  const router = useRouter();
  const eventId = router.query.eventId as string;
  const { push } = useRouter();

  const { data: event } = useEvent(eventId);
  const { mutateAsync: updateEvent } = useEventUpdate(eventId);

  const fileUpload = useFileUpload();

  const initialValues: EventFormValues = {
    name: event.name ?? '',
    location: event.location ?? '',
    description: event.description ?? '',
    price: event.price ?? undefined,
    teamCount: event.teamCount ?? undefined,
    startDate: new Date(event.startDate) ?? undefined,
    startTime: new Date(event.startDate) ?? undefined,
    quizId: event.quizId ?? undefined,
  };

  const imgUrl = event.banner ?? fileUpload.url;

  const handleSubmit = async (values: EventFormValues) => {
    const { startDate: date, startTime: time, ...rest } = values;

    const startDate = date.toString().slice(0, 11) + time.toString().slice(11);

    await updateEvent(
      { ...rest, startDate: new Date(startDate), banner: imgUrl },
      {
        onSuccess: (data) => {
          push(paths.eventPage(event.id));
        },
      }
    );
  };

  return {
    initialValues,
    handleSubmit,
    fileUpload,
    // TODO: does not show in edit mode
    imgUrl,
  };
};

export default EventsPage;

EventsPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
