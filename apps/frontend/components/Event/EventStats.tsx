import { Box, createStyles, Skeleton } from '@mantine/core';
import { useAppColorscheme } from 'hooks/colorscheme';
import { DateTimeFormat, formatCurrency, formatDate } from 'lib/utils';
import {
  Calendar, ClockAfternoon, IconProps,
  MapPin,
  Tag,
  UsersFour
} from 'phosphor-react';
import { EventWithOrganization } from 'types/event';
import { EventStat } from './EventStat';

interface Props {
  event: EventWithOrganization;
  loading: boolean;
}

const EventStats = ({ event, loading }: Props) => {
  const { theme } = useAppColorscheme();
  const iconProps: IconProps = {
    size: 32,
    weight: 'duotone',
  };

  const { classes } = useStyles();

  const eventStats = [
    {
      label: 'Date',
      value: formatDate(event.startDate, DateTimeFormat.DATE_NO_YEAR),
      icon: <Calendar {...iconProps} color={theme.colors.indigo[4]} />,
    },
    {
      label: 'Time',
      value: formatDate(event.startDate, DateTimeFormat.TIME),
      icon: <ClockAfternoon {...iconProps} color={theme.colors.orange[4]} />,
    },
    {
      label: 'Teams',
      value: event.teamCount.toString(),
      icon: <UsersFour {...iconProps} color={theme.colors.teal[4]} />,
    },
    {
      label: 'Price per team',
      value: formatCurrency(event.price, event.currency),
      icon: <Tag {...iconProps} color={theme.colors.red[4]} />,
    },
    {
      label: 'Location',
      value: event.location,
      icon: <MapPin {...iconProps} color={theme.colors.blue[4]} />,
    },
  ];

  return (
    <Box className={classes.grid}>
      {eventStats.map((stat) => (
        <Skeleton visible={loading} radius="md" key={stat.label}>
          <EventStat {...stat} />
        </Skeleton>
      ))}
    </Box>
  );
};

const useStyles = createStyles(() => ({
  grid: {
    flex: 1,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: 16,
  },
}));

export default EventStats;
