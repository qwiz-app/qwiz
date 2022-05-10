import {
  Button,
  createStyles,
  Paper,
  Skeleton,
  Text,
  Title
} from '@mantine/core';
import cn from 'classnames';
import { useAppColorscheme } from 'hooks/colorscheme';
import { EventWithOrganization } from 'types/event';
import { useCardStyles } from '../use-card-styles';

interface Props {
  event: EventWithOrganization;
  loading?: boolean;
}

export const HighlightedEventCard = ({ event, loading }: Props) => {
  const { classes } = useStyles();
  const { classes: classesCard } = useCardStyles();

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
      }}
      className={cn(classes.base, classesCard.card, classes.card)}
    >
      <div className={classes.overlay} />

      <div>
        <Text className={classes.category} size="xs">
          {/* {category} */}
          kategorija
        </Text>
        <Title order={3} className={classes.title}>
          {event?.name}
        </Title>
      </div>
      <Button variant="white" color="dark">
        Check out
      </Button>
    </Paper>
  );
};

const useStyles = createStyles((t) => {
  const { isDark } = useAppColorscheme();

  return {
    base: {
      height: 440,
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
      top: '20%',
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage:
        'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .85) 90%)',
    },

    title: {
      color: t.white,
      lineHeight: 1.2,
      fontSize: 32,
      marginTop: t.spacing.xs,
    },

    category: {
      color: t.white,
      opacity: 0.7,
      fontWeight: 700,
      textTransform: 'uppercase',
    },
  };
});
