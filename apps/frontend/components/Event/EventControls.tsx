/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
import { ActionIcon, Badge, Button, Group, Tooltip } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { useEventDelete } from 'hooks/api/events/use-event-delete';
import { useCurrentOrganizationInfo } from 'hooks/api/organizations';
import { useCurrentUser } from 'hooks/api/users';
import { useAppColorscheme } from 'hooks/colorscheme';
import { useDeleteConfirmModal } from 'hooks/use-delete-confirm-modal';
import { useRouter } from 'next/router';
import { paths } from 'paths';
import {
    CalendarCheck,
    CircleWavyCheck,
    NotePencil,
    ShareNetwork,
    Trash
} from 'phosphor-react';
import { useEffect, useState } from 'react';
import { EventWithOwner } from 'types/api/event';

interface Props {
  event: EventWithOwner;
}

export const EventControls = ({ event }: Props) => {
  const { isDark } = useAppColorscheme();
  const router = useRouter();
  const clipboard = useClipboard();

  const { isOrganization } = useCurrentUser();
  const { data: me } = useCurrentOrganizationInfo();

  const isMyEvent = isOrganization && me?.id === event.ownerId;

  // TODO: placeholder
  const [isReserved] = useState(false);

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
            variant={isDark ? 'filled' : 'outline'}
            color={isDark ? 'gray' : 'dark'}
            rightIcon={<NotePencil size={16} weight="bold" />}
            onClick={() => router.push(paths.eventEdit(event.id))}
          >
            Edit
          </Button>
          <Tooltip label="Delete event" withArrow position="bottom">
            <ActionIcon
              size={36}
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

      {!isOrganization && isReserved && (
        <Badge
          color="green"
          size="xl"
          variant={isDark ? 'light' : 'outline'}
          rightSection={<CircleWavyCheck size={20} weight="duotone" />}
        >
          Reserved
        </Badge>
      )}

      {!isOrganization && !isReserved && (
        <Button
          size="md"
          color="orange"
          variant={isDark ? 'light' : 'filled'}
          rightIcon={<CalendarCheck size={22} weight="duotone" />}
        >
          Reserve your spot
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
          size={isOrganization ? 36 : isReserved ? 32 : 42}
          radius={isOrganization ? 'sm' : isReserved ? 'xl' : 'sm'}
          color={isDark ? 'gray' : 'dark'}
          variant="filled"
          onClick={() => clipboard.copy(window?.location.href)}
        >
          <ShareNetwork
            size={isOrganization ? 24 : isReserved ? 20 : 24}
            weight="duotone"
          />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
};
