import { Button, SimpleGrid } from '@mantine/core';
import { FormikAutocomplete } from 'components/formik/FormikAutocomplete';
import { FormikDatePicker } from 'components/formik/FormikDatePicker';
import { FormikNumberInput } from 'components/formik/FormikNumberInput';
import { FormikRichText } from 'components/formik/FormikRichText';
import { FormikTextInput } from 'components/formik/FormikTextInput';
import { FormikTimeInput } from 'components/formik/FormikTimeInput';
import PageGrid from 'components/Grids/PageGrid';
import { PageSection } from 'components/PageLayouts/PageSection';
import { FileUpload } from 'components/UI/FileUpload';
import { Form, useFormikContext } from 'formik';
import { useQuizzes } from 'hooks/api/quiz';
import { memo } from 'react';
import { EventFormValues } from 'types/forms/EventFormValues';

type Props = Record<string, never>;

export const EventForm = memo(function EventForm(props: Props) {
  const { quizOptions, isSubmitting, handleFileUpload } = useEventForm(props);

  return (
    <Form>
      <PageSection title="New event">
        <PageGrid type="big">
          <FormikTextInput name="name" label="Name" />
          <FormikTextInput name="location" label="Location" />
          <SimpleGrid cols={2}>
            <FormikNumberInput name="teamCount" label="Team count" />
            <FormikNumberInput name="price" label="Price per team ($)" />
          </SimpleGrid>
          <FormikAutocomplete
            name="quizId"
            label="Quiz"
            options={quizOptions}
          />
          <SimpleGrid cols={2}>
            <FormikDatePicker name="startDate" label="Start date" />
            <FormikTimeInput name="startTime" label="Start time" />
          </SimpleGrid>
          <FormikRichText name="description" label="Description" />
          <FileUpload selectFile={handleFileUpload} />
          <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
            Create
          </Button>
        </PageGrid>
      </PageSection>
    </Form>
  );
});

function useEventForm(props: Props) {
  const { setFieldValue, isSubmitting } = useFormikContext<EventFormValues>();
  const { data: quizzes } = useQuizzes();

  const quizOptions =
    quizzes?.map((q) => ({ label: q.name, value: q.id })) || [];

  const handleFileUpload = (selectedFile: File) =>
    setFieldValue('banner', selectedFile);

  return { quizOptions, isSubmitting, handleFileUpload };
}
