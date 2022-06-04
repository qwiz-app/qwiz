import { forwardRef, memo } from 'react';
import { Form, useFormikContext } from 'formik';
import { FormikTextInput } from 'components/formik/FormikTextInput';
import {
  Avatar,
  Box,
  Button,
  Group,
  MantineColor,
  SelectItemProps,
  Stack,
  Text,
} from '@mantine/core';
import {
  UsersFour,
  NotePencil,
  UsersThree,
  Star,
  PlusCircle,
  PencilCircle,
} from 'phosphor-react';
import { PageSection } from 'components/PageLayouts/PageSection';
import PageGrid from 'components/Grids/PageGrid';
import { FileUpload, FileUploadProps } from 'components/UI/FileUpload';
import { FormikMultiSelect } from 'components/formik/FormikMultiSelect';
import { AttendeeWithUser } from 'types/api/atendee';
import { paths } from 'paths';
import { TeamFormValues } from 'types/forms/TeamFormValues';
import { useRouter } from 'next/router';
import { User } from '@prisma/client';
import { useCurrentSession } from 'hooks/api/session';
import { formatDate } from 'lib/utils';

type Props = {
  fileUpload: FileUploadProps;
  action: 'create' | 'edit';
  imgUrl?: string;
  attendees: AttendeeWithUser[];
};

export const TeamForm = memo(function TeamForm(props: Props) {
  const router = useRouter();
  const { isSubmitting, isValid, action, fileUpload, imgUrl, attendeeOptions } =
    useTeamForm(props);

  const title =
    action === 'edit' ? (
      <Group spacing={12}>
        <NotePencil size={40} weight="duotone" />
        Edit your team
      </Group>
    ) : (
      <Group spacing={12}>
        <UsersFour size={40} weight="duotone" />
        Create a new team
      </Group>
    );

  return (
    <Form>
      <PageSection title={title}>
        <PageGrid type="eventHighlight">
          <Stack spacing={4}>
            <Text weight={500} size="lg">
              Team logo
            </Text>
            <FileUpload {...fileUpload} url={imgUrl || fileUpload.url} />
          </Stack>
          <FormikTextInput
            name="name"
            label="Name"
            size="lg"
            required
            icon={<UsersThree size={24} weight="duotone" />}
          />
          <FormikMultiSelect
            itemComponent={AutoCompleteItem}
            name="members"
            label="Members"
            size="lg"
            options={attendeeOptions}
          />
          <Group position="right">
            <Button
              type="button"
              size="md"
              variant="light"
              disabled={isSubmitting}
              onClick={() => router.push(paths.teams())}
            >
              Back
            </Button>
            {action === 'create' && (
              <Button
                type="submit"
                size="md"
                loading={isSubmitting}
                disabled={isSubmitting || !isValid}
                rightIcon={<PlusCircle size={20} weight="duotone" />}
              >
                Create team
              </Button>
            )}
            {action === 'edit' && (
              <Button
                type="submit"
                size="md"
                loading={isSubmitting}
                disabled={isSubmitting || !isValid}
                rightIcon={<PencilCircle size={20} weight="duotone" />}
              >
                Edit team
              </Button>
            )}
          </Group>
        </PageGrid>
      </PageSection>
    </Form>
  );
});

function useTeamForm(props: Props) {
  const { isSubmitting, isValid } = useFormikContext<TeamFormValues>();
  const { attendees, action, fileUpload, imgUrl } = props;
  const { user } = useCurrentSession();

  const attendeeOptions =
    attendees
      ?.filter((a) => a.user.name && user?.email !== a.user.email)
      .map((a) => ({
        ...a.user,
        createdAt: a.createdAt,
        label: a.user.name,
        value: a.id,
      })) ?? [];

  return { isSubmitting, isValid, action, fileUpload, imgUrl, attendeeOptions };
}

type ItemProps = User &
  SelectItemProps & {
    id: string;
    color: MantineColor;
    createdAt: Date;
    label: string;
  };

// eslint-disable-next-line react/display-name
const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ value, label, email, image, createdAt, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap sx={() => ({ width: '100%' })}>
        <Avatar size="md" src={image} alt="thumbnail" sx={() => ({})}>
          <Star size={24} weight="duotone" />
        </Avatar>

        <Box sx={() => ({ width: '100%' })}>
          <Group position="apart">
            <Text>{label}</Text>
            <Text size="xs" color="dimmed">
              {formatDate(createdAt)}
            </Text>
          </Group>
          <Text size="xs" color="dimmed">
            {email}
          </Text>
        </Box>
      </Group>
    </div>
  )
);
