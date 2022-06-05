import {
  Avatar,
  Box,
  Button,
  CloseButton,
  Group,
  MantineColor,
  MultiSelectValueProps, SelectItemProps,
  Stack,
  Text
} from '@mantine/core';
import { User } from '@prisma/client';
import { FormikMultiSelect } from 'components/formik/FormikMultiSelect';
import { FormikTextInput } from 'components/formik/FormikTextInput';
import PageGrid from 'components/Grids/PageGrid';
import { PageSection } from 'components/PageLayouts/PageSection';
import { FileUpload, FileUploadProps } from 'components/UI/FileUpload';
import { Form, useFormikContext } from 'formik';
import { useCurrentSession } from 'hooks/api/session';
import { formatDate } from 'lib/utils';
import { useRouter } from 'next/router';
import { paths } from 'paths';
import {
  IdentificationCard,
  NotePencil,
  PencilCircle,
  PlusCircle,
  Star,
  UsersFour,
  UsersThree
} from 'phosphor-react';
import { forwardRef, memo } from 'react';
import { AttendeeWithUser } from 'types/api/atendee';
import { TeamFormValues } from 'types/forms/TeamFormValues';

type Props = {
  fileUpload: FileUploadProps;
  action: 'create' | 'edit';
  imgUrl?: string;
  attendees: AttendeeWithUser[];
};

export const TeamForm = memo(function TeamForm(props: Props) {
  const router = useRouter();
  const { isSubmitting, action, fileUpload, imgUrl, attendeeOptions } =
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
              Team avatar
            </Text>
            <FileUpload {...fileUpload} url={imgUrl || fileUpload.url} />
          </Stack>
          <FormikTextInput
            name="name"
            label="Name"
            size="lg"
            required
            icon={<IdentificationCard size={24} weight="duotone" />}
          />
          <FormikMultiSelect
            valueComponent={Value}
            itemComponent={AutoCompleteItem}
            icon={<UsersThree size={24} weight="duotone" />}
            name="members"
            label="Other members"
            size="lg"
            searchable
            clearable
            options={attendeeOptions}
          />
          <Group position="right" mt={8}>
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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

const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ value, label, email, image, createdAt, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap sx={{ width: '100%' }}>
        <Avatar size="md" radius="xl" src={image} alt="thumbnail">
          <Star size={24} weight="duotone" />
        </Avatar>

        <Box sx={{ width: '100%' }}>
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

const Value = ({
  label,
  email,
  image,
  onRemove,
}: MultiSelectValueProps & User) => {
  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        cursor: 'default',
        alignItems: 'center',
        backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        border: `1px solid ${
          theme.colorScheme === 'dark'
            ? theme.colors.dark[7]
            : theme.colors.gray[4]
        }`,
        paddingLeft: 8,
        borderRadius: 4,
        margin: '0 2px',
      })}
    >
      <Group spacing={6}>
        <Box>
          <Avatar size="xs" src={image} alt="thumbnail" radius="xl">
            <Star size={24} weight="duotone" />
          </Avatar>
        </Box>
        <Box sx={{ lineHeight: 1, fontSize: 14 }}>{label}</Box>
      </Group>
      <CloseButton
        onMouseDown={onRemove}
        variant="transparent"
        size={22}
        iconSize={14}
        tabIndex={-1}
      />
    </Box>
  );
};
