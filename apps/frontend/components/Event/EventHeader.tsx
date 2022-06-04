import {
  Anchor,
  Avatar,
  createStyles,
  Group,
  Image,
  Paper,
  Skeleton,
  Title,
} from '@mantine/core';
import { useBreakpoints } from 'hooks/breakpoints';
import { useAppColorscheme } from 'hooks/colorscheme';
import Link from 'next/link';
import { paths } from 'paths';
import { CircleWavyCheck } from 'phosphor-react';
import { EventWithOwner } from 'types/api/event';
import { EventControls } from './EventControls';

interface Props {
  event: EventWithOwner;
  loading: boolean;
}

export const EventHeader = ({ event, loading }: Props) => {
  const { theme } = useAppColorscheme();
  const { matches } = useBreakpoints();
  const { classes } = useStyles();

  return (
    <Skeleton visible={loading} radius="md">
      <Paper
        radius="md"
        sx={(t) => ({
          overflow: 'hidden',
        })}
      >
        <Paper withBorder={!event.banner} radius={0}>
          <Image
            src={event.banner}
            alt="banner"
            height="26vh"
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
                    <Anchor>{event?.owner.name}</Anchor>
                    <CircleWavyCheck
                      size={20}
                      color={theme.colors.orange[4]}
                      weight="duotone"
                    />
                  </Group>
                </Title>
              </Link>
              <EventControls event={event} />
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
  const { isDark } = useAppColorscheme();
  return {
    avatar: {
      transform: !matches.max.lg && 'translateY(-45%)',
      marginTop: matches.max.lg && -80,
      borderRadius: '100rem',
      cursor: 'pointer',
      border: `6px solid ${isDark ? t.colors.dark[7] : t.white}`,
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
