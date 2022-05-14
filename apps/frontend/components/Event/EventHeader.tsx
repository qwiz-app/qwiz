import {
  Paper,
  Group,
  Avatar,
  Title,
  Button,
  createStyles,
  Image,
  Stack,
} from '@mantine/core';
import { NotePencil, CalendarCheck } from 'phosphor-react';
import Link from 'next/link';
import { useState } from 'react';

export const EventHeader = (props) => {
  const { classes } = useStyles();

  const [isOwner, setIsOwner] = useState(false);

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
        //   temporary
        onClick={() => setIsOwner((prev) => !prev)}
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
            {isOwner ? (
              <Button variant="outline">
                <Group spacing={6}>
                  Edit
                  <NotePencil size={16} weight="bold" />
                </Group>
              </Button>
            ) : (
              // TODO: special button design
              <Button size="md" ml={8} variant="gradient">
                <Group spacing={10}>
                  Reserve your spot
                  <CalendarCheck size={24} weight="bold" />
                </Group>
              </Button>
            )}
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
    },

    eventName: {
      lineHeight: '1.2',
    },
  };
});
