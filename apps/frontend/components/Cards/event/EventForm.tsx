import { Button, Group, SimpleGrid, Stack, Text } from '@mantine/core';
import { EventAutoCompleteItem } from 'components/Event/EventAutocompleteItem';
import { FormikAutocomplete } from 'components/formik/FormikAutocomplete';
import { FormikDatePicker } from 'components/formik/FormikDatePicker';
import { FormikRichText } from 'components/formik/FormikRichText';
import { FormikTextInput } from 'components/formik/FormikTextInput';
import { FormikTimeInput } from 'components/formik/FormikTimeInput';
import PageGrid from 'components/Grids/PageGrid';
import { PageSection } from 'components/PageLayouts/PageSection';
import { FileUpload, FileUploadProps } from 'components/UI/FileUpload';
import dayjs from 'dayjs';
import { Form, useFormikContext } from 'formik';
import { useQuizzes } from 'hooks/api/quiz';
import { useRouter } from 'next/router';
import { paths } from 'paths';
import {
  Calendar,
  CalendarX,
  Clock,
  CurrencyDollar,
  IdentificationCard,
  MapPin,
  NotePencil,
  PencilCircle,
  PlusCircle,
  Queue,
  UsersThree
} from 'phosphor-react';
import { memo } from 'react';
import { EventFormValues } from 'types/forms/EventFormValues';

interface Props {
  fileUpload: FileUploadProps;
  action: 'edit' | 'create';
  imgUrl?: string;
}

export const EventForm = memo(function EventForm(props: Props) {
  const { quizOptions, isSubmitting } = useEventForm(props);
  const { fileUpload, action, imgUrl } = props;
  const router = useRouter();

  const title =
    action === 'edit' ? (
      <Group spacing={12}>
        <NotePencil size={40} weight="duotone" />
        Edit your event
      </Group>
    ) : (
      <Group spacing={12}>
        <CalendarX size={40} weight="duotone" />
        Create a new event
      </Group>
    );

  return (
    <Form>
      <PageSection title={title}>
        <PageGrid type="eventHighlight">
          <Stack spacing={4}>
            <Text weight={500} size="lg">
              Banner
            </Text>
            <FileUpload {...fileUpload} url={imgUrl || fileUpload.url} />
          </Stack>
          <FormikTextInput
            required
            size="lg"
            name="name"
            label="Name"
            icon={<IdentificationCard size={24} weight="duotone" />}
          />
          <FormikTextInput
            required
            size="lg"
            name="location"
            label="Location"
            icon={<MapPin size={24} weight="duotone" />}
          />
          <SimpleGrid cols={2}>
            {/* TODO: throws an error [something about undefined type] */}
            {/* <FormikNumberInput
              required
              size="lg"
              name="teamCount"
              label="Team count"
              icon={<UsersThree size={24} weight="duotone" />}
            />
            <FormikNumberInput
              required
              size="lg"
              name="price"
              label="Price per team"
              icon={<CurrencyDollar size={24} weight="duotone" />}
            /> */}
            <FormikTextInput
              required
              size="lg"
              type="number"
              name="teamCount"
              label="Team count"
              icon={<UsersThree size={24} weight="duotone" />}
            />
            <FormikTextInput
              required
              size="lg"
              type="number"
              name="price"
              label="Price per team"
              icon={<CurrencyDollar size={24} weight="duotone" />}
            />
          </SimpleGrid>
          <FormikAutocomplete
            itemComponent={EventAutoCompleteItem}
            required
            size="lg"
            name="quizId"
            label="Quiz"
            options={quizOptions}
            icon={<Queue size={24} weight="duotone" />}
            filter={(value, item) =>
              item.label.toLowerCase().includes(value.toLowerCase().trim())
            }
          />
          <SimpleGrid cols={2}>
            <FormikDatePicker
              required
              size="lg"
              name="startDate"
              label="Start date"
              minDate={dayjs(new Date()).add(1, 'days').toDate()}
              icon={<Calendar size={24} weight="duotone" />}
            />
            <FormikTimeInput
              required
              size="lg"
              name="startTime"
              label="Start time"
              icon={<Clock size={24} weight="duotone" />}
            />
          </SimpleGrid>
          <FormikRichText name="description" label="Description" />

          <Group position="right">
            <Button
              type="button"
              size="md"
              variant="light"
              disabled={isSubmitting}
              onClick={() => router.push(paths.events())}
            >
              Back
            </Button>
            {action === 'create' && (
              <Button
                type="submit"
                size="md"
                loading={isSubmitting}
                disabled={isSubmitting}
                rightIcon={<PlusCircle size={20} weight="duotone" />}
              >
                Create event
              </Button>
            )}
            {action === 'edit' && (
              <Button
                type="submit"
                size="md"
                loading={isSubmitting}
                disabled={isSubmitting}
                rightIcon={<PencilCircle size={20} weight="duotone" />}
              >
                Edit event
              </Button>
            )}
          </Group>
        </PageGrid>
      </PageSection>
    </Form>
  );
});

function useEventForm(props: Props) {
  const { isSubmitting } = useFormikContext<EventFormValues>();
  const { data: quizzes } = useQuizzes();

  const quizOptions =
    quizzes?.map((q) => ({ ...q, label: q.name, value: q.id })) || [];

  return { quizOptions, isSubmitting };
}
