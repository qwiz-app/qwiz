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
  Paper,
  Skeleton,
  Stack,
  Title,
  Tooltip
} from '@mantine/core';
import { useAppColorscheme } from 'hooks/colorscheme';
import Link from 'next/link';
import {
  CalendarCheck,
  CircleWavyCheck,
  NotePencil,
  ShareNetwork
} from 'phosphor-react';
import { useState } from 'react';
import { EventWithOrganization } from 'types/event';

interface Props {
  event: EventWithOrganization;
  loading: boolean;
}

export const EventHeader = ({ event, loading }: Props) => {
  const { isDark } = useAppColorscheme();
  const { classes } = useStyles();

  const [isOwner] = useState(false);
  const [isReserved] = useState(false);

  const organizationPage = `/organization/${event.ownerId}`;

  return (
    <Skeleton visible={loading} radius="md">
      <Paper
        radius="md"
        // TODO: create small custom shadows to reuse througout the app on elements like this
        sx={(t) => ({
          overflow: 'hidden',
        })}
      >
        <Image src={event.banner} alt="banner" height="40vh" />
        <Group
          py={16}
          pr={32}
          pl={64}
          spacing={32}
          sx={() => ({
            top: 0,
            left: 50,
          })}
          align="start"
          noWrap
        >
          <Link href={organizationPage}>
            <Avatar
              // TODO: placeholder
              src={event.owner.user.image}
              size={164}
              className={classes.avatar}
            />
          </Link>
          <Stack
            spacing={24}
            sx={() => ({
              width: '100%',
            })}
          >
            <Group
              position="apart"
              sx={() => ({
                minHeight: 42,
              })}
            >
              <Link href={organizationPage} passHref>
                <Title order={5} className={classes.orgName}>
                  {event?.owner.name}
                </Title>
              </Link>
              <Group spacing={8}>
                {isOwner ? (
                  <Button
                    variant={isDark ? 'filled' : 'outline'}
                    color={isDark ? 'gray' : 'dark'}
                    rightIcon={<NotePencil size={16} weight="bold" />}
                  >
                    Edit
                  </Button>
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
                    color="indigo"
                    variant="filled"
                    rightIcon={<CalendarCheck size={22} weight="duotone" />}
                  >
                    Reserve your spot
                  </Button>
                )}
                <Tooltip
                  withArrow
                  label="Share with your friends"
                  color={isDark ? 'gray' : 'dark'}
                  position="bottom"
                >
                  <ActionIcon
                    size={isOwner ? 36 : isReserved ? 32 : 42}
                    variant="filled"
                    radius={isOwner ? 'sm' : isReserved ? 'xl' : 'sm'}
                    color={isDark ? 'gray' : 'dark'}
                  >
                    <ShareNetwork
                      size={isOwner ? 24 : isReserved ? 20 : 24}
                      weight="duotone"
                    />
                  </ActionIcon>
                </Tooltip>
              </Group>
            </Group>
            <Title order={2} align="left" className={classes.eventName} mb={24}>
              {event.name}
            </Title>
          </Stack>
        </Group>
      </Paper>
    </Skeleton>
  );
};

const useStyles = createStyles((t) => {
  return {
    avatar: {
      transform: 'translateY(-45%)',
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
    },
  };
});
