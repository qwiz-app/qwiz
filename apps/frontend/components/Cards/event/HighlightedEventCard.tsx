import {
  Avatar,
  Badge,
  Box,
  Button,
  createStyles,
  Group,
  Paper,
  Skeleton,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import cn from 'classnames';
import { useAppColorscheme } from 'hooks/colorscheme';
import { formatDate, relativeTimeTo } from 'lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { EventWithOrganization } from 'types/event';
import { useCardStyles } from '../use-card-styles';

interface Props {
  event: EventWithOrganization;
  loading?: boolean;
}

export const HighlightedEventCard = ({ event, loading }: Props) => {
  const { classes } = useStyles();
  const { classes: classesCard } = useCardStyles();

  const router = useRouter();

  const gotoEvent = () => router.push(`/events/${event.id}`);

  return loading ? (
    <Skeleton visible radius="md" className={classes.base} />
  ) : (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      sx={{
        // TODO: placeholder gradient or something
        backgroundImage: event?.banner ? `url(${event.banner})` : 'transparent',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className={cn(classes.base, classesCard.card, classes.card)}
    >
      <Box className={classes.overlay} />
      <Stack sx={{ width: '100%' }}>
        <Group position="apart" sx={{ width: '100%' }}>
          <Tooltip withArrow label={formatDate(event.startDate)}>
            <Badge variant="filled" color="dark">
              {relativeTimeTo(event.startDate)}
            </Badge>
          </Tooltip>
        </Group>

        <Link href={`/organization/${event.ownerId}`}>
          <Group spacing={0} noWrap sx={{ cursor: 'pointer' }}>
            <Avatar
              // TODO: placeholder
              src={event.owner.user.image}
              size={20}
              radius="xl"
              mr="xs"
            />
            <Text size="sm" lineClamp={1} className={classes.owner}>
              {event.owner.name}
            </Text>
          </Group>
        </Link>
      </Stack>
      <Group position="apart" sx={{ width: '100%' }}>
        <Title order={3} className={classes.title} color="white">
          {event?.name}
        </Title>
        <Button
          ml="auto"
          variant="white"
          color="dark"
          radius="sm"
          onClick={gotoEvent}
        >
          Check it out
        </Button>
      </Group>
    </Paper>
  );
};

const useStyles = createStyles((t) => {
  const { isDark } = useAppColorscheme();

  return {
    base: {
      height: 440,
      width: '100%',
      borderRadius: t.radius.md,
    },

    card: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      background: isDark ? t.colors.dark[6] : t.colors.gray[8],
      overflow: 'hidden',
    },

    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage:
        'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .85) 90%)',
    },

    owner: {
      color: t.white,
      zIndex: 2,
    },

    title: {
      color: t.white,
      lineHeight: 1.2,
      fontSize: 32,
      zIndex: 2,
    },

    tag: {
      color: t.white,
      opacity: 0.7,
      fontWeight: 700,
      textTransform: 'uppercase',
      zIndex: 2,
    },
  };
});
