import { FormikAutocomplete } from 'components/formik/FormikAutocomplete';
import { Button } from '@mantine/core';
import { memo } from 'react';
import { Form, useFormikContext } from 'formik';
import { PageSection } from 'components/PageLayouts/PageSection';
import PageGrid from 'components/Grids/PageGrid';
import { useQuizzes } from 'hooks/api/quiz';
import { FileUpload } from 'components/UI/FileUpload';
import { EventFormValues } from 'types/forms/EventFormValues';
import { FormikTextInput } from 'components/formik/FormikTextInput';
import { FormikDatePicker } from 'components/formik/FormikDatePicker';
import { FormikTimeInput } from 'components/formik/FormikTimeInput';
import { FormikRichText } from 'components/formik/FormikRichText';

type Props = Record<string, never>;

export const EventForm = memo(function EventForm(props: Props) {
  const { quizOptions, isSubmitting, handleFileUpload } = useEventForm(props);

  return (
    <Form>
      <PageSection title="New event">
        <PageGrid type="big">
          <FormikTextInput name="name" label="Name" />
          <FormikTextInput name="location" label="Location" />
          <FormikTextInput name="price" type="number" label="Price per team" />
          <FormikTextInput name="teamCount" type="number" label="Team count" />
          <FormikAutocomplete
            name="quizId"
            label="Quiz"
            options={quizOptions}
          />
          <FormikDatePicker name="startDate" label="Start date" />
          <FormikTimeInput name="startTime" label="Start time" />
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
