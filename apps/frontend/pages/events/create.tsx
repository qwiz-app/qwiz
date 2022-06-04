import { Container } from '@mantine/core';
import { EventForm } from 'components/Cards/event/EventForm';
import DashboardLayout from 'components/Layouts/DashboardLayout';
import { HomepageLayout } from 'components/PageLayouts/HomepageLayout';
import { eventSchema } from 'domain/util/validation';
import { Formik } from 'formik';
import { useEventCreate } from 'hooks/api/events/use-event-create';
import { useFileUpload } from 'hooks/use-flle-upload';
import { useRouter } from 'next/router';
import { paths } from 'paths';
import { EventFormValues } from 'types/forms/EventFormValues';

const EventsPage = () => {
  const { initialValues, handleSubmit, fileUpload } = useEventPage();

  return (
    <HomepageLayout>
      <Container size="sm" p={0}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={eventSchema}
        >
          <EventForm fileUpload={fileUpload} action="create" />
        </Formik>
      </Container>
    </HomepageLayout>
  );
};

const useEventPage = () => {
  const { mutateAsync: createEvent } = useEventCreate();
  const { push } = useRouter();

  const fileUpload = useFileUpload();

  const initialValues: EventFormValues = {
    name: '',
    location: '',
    description: '',
    price: undefined,
    teamCount: undefined,
    startDate: undefined,
    startTime: undefined,
    quizId: undefined,
  };

  const handleSubmit = async (values: EventFormValues) => {
    const { startDate: date, startTime: time, ...rest } = values;

    const startDate = date.toString().slice(0, 11) + time.toString().slice(11);

    await createEvent(
      { ...rest, startDate: new Date(startDate), banner: fileUpload.url },
      {
        onSuccess: (data) => {
          push(paths.eventPage(data.id));
        },
      }
    );
  };

  return { initialValues, handleSubmit, fileUpload };
};

export default EventsPage;

EventsPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
