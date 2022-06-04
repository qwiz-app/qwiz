/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
import { ActionIcon, Badge, Button, Group, Tooltip } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import dayjs from 'dayjs';
import { useEventDelete } from 'hooks/api/events/use-event-delete';
import { useCurrentOrganizationInfo } from 'hooks/api/organizations';
import { useCurrentUser } from 'hooks/api/users';
import { useAppColorscheme } from 'hooks/colorscheme';
import { useDeleteConfirmModal } from 'hooks/use-delete-confirm-modal';
import { useTeamAppliedEvents } from 'hooks/use-team-applied-events';
import { useRouter } from 'next/router';
import { paths } from 'paths';
import {
  CalendarCheck,
  CircleWavyCheck,
  NotePencil,
  ShareNetwork,
  SignIn,
  Trash
} from 'phosphor-react';
import { useEffect } from 'react';
import { EventWithOwner } from 'types/api/event';

interface Props {
  event: EventWithOwner;
}

export const EventControls = ({ event }: Props) => {
  const { isDark } = useAppColorscheme();
  const router = useRouter();
  const clipboard = useClipboard();

  const { isOrganization, isUser, isAuthenticated, isSessionLoading } =
    useCurrentUser();
  const { data: me } = useCurrentOrganizationInfo(isOrganization);

  const isMyEvent = isOrganization && me?.id === event.ownerId;
  const isActiveEvent = dayjs().isBefore(event.startDate);
  const canApply = isUser && isActiveEvent;

  const { hasSignedUp } = useTeamAppliedEvents(isUser);

  const isReserved = hasSignedUp(event.id);

  const {
    mutate: deleteEvent,
    isSuccess: isDeleteSuccess,
    isLoading: isDeleteLoading,
  } = useEventDelete(event.id);

  const openDeleteConfirmModal = useDeleteConfirmModal({
    onConfirm: () => deleteEvent(),
    deletedEntity: 'event',
  });

  useEffect(() => {
    if (isDeleteSuccess) {
      router.push(paths.events());
      showNotification({
        title: 'Event deleted',
        message: 'Event has successfully been deleted',
        color: 'green',
      });
    }
  }, [isDeleteSuccess]);
  return (
    <Group spacing={8}>
      {isMyEvent && (
        <>
          <Button
            size="md"
            variant={isDark ? 'filled' : 'outline'}
            color={isDark ? 'gray' : 'dark'}
            rightIcon={<NotePencil size={16} weight="bold" />}
            onClick={() => router.push(paths.eventEdit(event.id))}
          >
            Edit
          </Button>
          <Tooltip label="Delete event" withArrow position="bottom">
            <ActionIcon
              size={42}
              variant="filled"
              color="red"
              onClick={openDeleteConfirmModal}
              loading={isDeleteLoading}
            >
              <Trash size={20} />
            </ActionIcon>
          </Tooltip>
        </>
      )}

      {canApply && isReserved && (
        <Badge
          color="green"
          size="xl"
          variant={isDark ? 'light' : 'outline'}
          rightSection={<CircleWavyCheck size={20} weight="duotone" />}
          mr={12}
        >
          Reserved
        </Badge>
      )}
      {canApply && !isReserved && (
        <Button
          size="md"
          color="orange"
          variant={isDark ? 'light' : 'filled'}
          rightIcon={<CalendarCheck size={22} weight="duotone" />}
        >
          Reserve your spot
        </Button>
      )}
      {!isAuthenticated && !isSessionLoading && (
        <Button
          size="md"
          leftIcon={<SignIn size={22} weight="duotone" />}
          onClick={() => router.push(paths.signIn())}
        >
          Sign in to reserve your spot
        </Button>
      )}
      <Tooltip
        label="Link copied!"
        gutter={5}
        placement="center"
        position="bottom"
        transition="slide-down"
        transitionDuration={200}
        opened={clipboard.copied}
      >
        <ActionIcon
          size={42}
          color={isDark ? 'gray' : 'dark'}
          variant="filled"
          onClick={() => clipboard.copy(window?.location.href)}
        >
          <ShareNetwork size={24} weight="duotone" />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
};
