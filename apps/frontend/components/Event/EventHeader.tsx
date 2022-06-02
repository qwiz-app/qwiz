/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  createStyles,
  Group,
  Image,
  LoadingOverlay,
  Paper,
  Skeleton,
  Title,
  Tooltip,
} from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { useEventDelete } from 'hooks/api/events/use-event-delete';
import { useCurrentUser } from 'hooks/api/users';
import { useBreakpoints } from 'hooks/breakpoints';
import { useAppColorscheme } from 'hooks/colorscheme';
import { useDeleteConfirmModal } from 'hooks/use-delete-confirm-modal';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { paths } from 'paths';
import {
  CalendarCheck,
  CircleWavyCheck,
  NotePencil,
  ShareNetwork,
  Trash,
} from 'phosphor-react';
import { useEffect, useState } from 'react';
import { EventWithOwner } from 'types/api/event';

interface Props {
  event: EventWithOwner;
  loading: boolean;
}

export const EventHeader = ({ event, loading }: Props) => {
  const { isDark, theme } = useAppColorscheme();
  const { matches } = useBreakpoints();
  const { classes } = useStyles();
  const { isOrganization } = useCurrentUser();

  // TODO: placeholder
  const [isReserved] = useState(false);

  const router = useRouter();
  const clipboard = useClipboard();

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
    <Skeleton visible={loading} radius="md">
      <Paper
        radius="md"
        sx={(t) => ({
          overflow: 'hidden',
        })}
      >
        <LoadingOverlay visible={isDeleteLoading} />
        <Paper withBorder={!event.banner} radius={0}>
          <Image
            src={event.banner}
            alt="banner"
            height="25vh"
            withPlaceholder
          />
        </Paper>
        <Group
          py={16}
          pb={matches.max.lg && 64}
          pr={matches.max.lg ? 0 : 32}
          pl={matches.max.lg ? 0 : 64}
          spacing={matches.max.lg ? 0 : 48}
          sx={() => ({
            top: 0,
            left: 0,
          })}
          direction={matches.max.lg ? 'column' : 'row'}
          align={matches.max.lg ? 'center' : 'left'}
          position={matches.max.lg ? 'center' : 'left'}
          noWrap
        >
          <Link href={paths.organizationPage(event.ownerId)}>
            <Avatar
              src={event.owner.user.image}
              size={164}
              className={classes.avatar}
            />
          </Link>
          <Group
            spacing={24}
            sx={() => ({
              width: '100%',
            })}
            direction={matches.max.lg ? 'row' : 'column'}
            align={matches.max.lg ? 'center' : 'start'}
            position="apart"
            px={matches.max.lg && 12}
          >
            <Group
              direction={matches.max.lg ? 'column' : 'row'}
              position={matches.max.lg ? 'center' : 'apart'}
              align={matches.max.lg ? 'center' : 'center'}
              sx={() => ({
                minHeight: matches.max.lg ? 'auto' : 42,
                width: '100%',
              })}
            >
              <Link href={paths.organizationPage(event.ownerId)} passHref>
                <Title
                  order={matches.max.lg ? 6 : 5}
                  className={classes.orgName}
                >
                  <Group spacing="sm">
                    {event?.owner.name}
                    <CircleWavyCheck
                      size={20}
                      color={theme.colors.orange[4]}
                      weight="duotone"
                    />
                  </Group>
                </Title>
              </Link>
              <Group spacing={8}>
                {isOrganization ? (
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
                      >
                        <Trash size={20} />
                      </ActionIcon>
                    </Tooltip>
                  </>
                ) : // TODO: special button design
                isReserved ? (
                  <Badge
                    color="green"
                    size="xl"
                    variant={isDark ? 'light' : 'outline'}
                    rightSection={
                      <CircleWavyCheck size={20} weight="duotone" />
                    }
                  >
                    Reserved
                  </Badge>
                ) : (
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
            </Group>
            <Title
              order={matches.max.lg ? 3 : 2}
              className={classes.eventName}
              mb={!matches.max.lg && 24}
            >
              {event.name}
            </Title>
          </Group>
        </Group>
      </Paper>
    </Skeleton>
  );
};

const useStyles = createStyles((t) => {
  const { matches } = useBreakpoints();

  return {
    avatar: {
      transform: !matches.max.lg && 'translateY(-45%)',
      marginTop: matches.max.lg && -80,
      boxShadow: t.shadows.xl,
      borderRadius: '100rem',
      cursor: 'pointer',
    },

    orgName: {
      cursor: 'pointer',
      fontWeight: 500,
    },

    eventName: {
      lineHeight: '1.2',
      fontWeight: 700,
      width: '100%',
      textAlign: matches.max.lg ? 'center' : 'left',
      order: matches.max.lg && -1,
      marginTop: matches.max.lg && 32,
    },
  };
});
