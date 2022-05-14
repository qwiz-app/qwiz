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
  Stack,
  Title,
  Tooltip,
} from '@mantine/core';
import { useAppColorscheme } from 'hooks/colorscheme';
import Link from 'next/link';
import {
  CalendarCheck,
  CircleWavyCheck,
  NotePencil,
  ShareNetwork,
} from 'phosphor-react';
import { useState } from 'react';

export const EventHeader = (props) => {
  const { isDark } = useAppColorscheme();
  const { classes } = useStyles();

  const [isOwner, setIsOwner] = useState(false);
  const [isReserved, setIsReserved] = useState(true);

  const organizationPage = `organization/${'fakeid'}`;

  return (
    <Paper
      radius="md"
      sx={(t) => ({
        overflow: 'hidden',
      })}
    >
      <Image
        src="https://images.squarespace-cdn.com/content/v1/5f369686a97dce01844a68df/1600162467608-2LJJ8UFP07WQUJ9TUOX8/pubquiz.jpeg"
        alt="banner"
        height="40vh"
      />
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
            src="https://source.boringavatars.com/marble/64/random?square"
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
                Klub Močvara
                {isOwner}
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
                  rightSection={<CircleWavyCheck size={20} weight="duotone" />}
                >
                  Reserved
                </Badge>
              ) : (
                <Button
                  size="md"
                  // color={isDark && 'indigo'}
                  color="indigo"
                  variant="filled"
                  rightIcon={<CalendarCheck size={22} weight="duotone" />}
                >
                  Reserve your spot
                </Button>
              )}
              <Tooltip
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
            Jazz u Močvari
          </Title>
        </Stack>
      </Group>
    </Paper>
  );
};

const useStyles = createStyles((t) => {
  return {
    avatar: {
      transform: 'translateY(-65%)',
      // TODO: shadow takes color of avatar
      boxShadow: t.shadows.xl,
      borderRadius: 10000,
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
