import {
  Avatar,
  Box,
  Button,
  Group,
  MantineColor,
  SelectItemProps,
  SimpleGrid,
  Text
} from '@mantine/core';
import { Quiz } from '@prisma/client';
import { FormikAutocomplete } from 'components/formik/FormikAutocomplete';
import { FormikDatePicker } from 'components/formik/FormikDatePicker';
import { FormikRichText } from 'components/formik/FormikRichText';
import { FormikTextInput } from 'components/formik/FormikTextInput';
import { FormikTimeInput } from 'components/formik/FormikTimeInput';
import PageGrid from 'components/Grids/PageGrid';
import { PageSection } from 'components/PageLayouts/PageSection';
import { FileUpload } from 'components/UI/FileUpload';
import dayjs from 'dayjs';
import { Form, useFormikContext } from 'formik';
import { useQuizzes } from 'hooks/api/quiz';
import { formatDate } from 'lib/utils';
import { useRouter } from 'next/router';
import { paths } from 'paths';
import {
  Calendar,
  Clock,
  CurrencyDollar,
  IdentificationCard,
  MapPin,
  PlusCircle,
  Queue,
  Star,
  UsersThree
} from 'phosphor-react';
import { forwardRef, memo } from 'react';
import { EventFormValues } from 'types/forms/EventFormValues';

type Props = Record<string, never>;

export const EventForm = memo(function EventForm(props: Props) {
  const { quizOptions, isSubmitting, handleFileUpload } = useEventForm(props);
  const router = useRouter();

  return (
    <Form>
      <PageSection title="New event">
        <PageGrid type="big">
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
              name="teamCount"
              label="Team count"
            />
            <FormikNumberInput
              name="price"
              label="Price per team"
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
            itemComponent={AutoCompleteItem}
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
          <FileUpload selectFile={handleFileUpload} />
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
            <Button
              type="submit"
              size="md"
              loading={isSubmitting}
              disabled={isSubmitting}
              rightIcon={<PlusCircle size={20} weight="duotone" />}
            >
              Create event
            </Button>
          </Group>
        </PageGrid>
      </PageSection>
    </Form>
  );
});

function useEventForm(props: Props) {
  const { setFieldValue, isSubmitting } = useFormikContext<EventFormValues>();
  const { data: quizzes } = useQuizzes();

  const quizOptions =
    quizzes?.map((q) => ({ ...q, label: q.name, value: q.id })) || [];

  const handleFileUpload = (selectedFile: File) =>
    setFieldValue('banner', selectedFile);

  return { quizOptions, isSubmitting, handleFileUpload };
}

interface ItemProps extends Quiz, SelectItemProps {
  id: string;
  color: MantineColor;
  description: string;
  label: string;
}

// eslint-disable-next-line react/display-name
const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
  (
    { description, updatedAt, thumbnail, value, label, ...others }: ItemProps,
    ref
  ) => (
    <div ref={ref} {...others}>
      <Group noWrap sx={() => ({ width: '100%' })}>
        <Avatar size="md" src={thumbnail} alt="thumbnail" sx={() => ({})}>
          <Star size={24} weight="duotone" />
        </Avatar>

        <Box sx={() => ({ width: '100%' })}>
          <Group position="apart">
            <Text>{label}</Text>
            <Text size="xs" color="dimmed">
              {formatDate(updatedAt)}
            </Text>
          </Group>
          <Text size="xs" color="dimmed">
            {description}
          </Text>
        </Box>
      </Group>
    </div>
  )
);
