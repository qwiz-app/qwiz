import { AxiosError } from 'axios';
import { ImageCard } from 'components/Cards/event/EventCard';
import { HighlightedEventCard } from 'components/Cards/event/HighlightedEventCard';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { UseQueryResult } from 'react-query';
import { EventWithOwner } from 'types/api/event';

export const useEventsPage = ({
  data: events,
  isPlaceholderData,
  isLoading,
}: UseQueryResult<EventWithOwner[], AxiosError<unknown, unknown>>) => {
  const isLoadingOrPlaceholder = isLoading || isPlaceholderData;
  const now = dayjs();

  const activeEvents = useMemo(
    () => events?.filter((event) => dayjs(event.startDate) >= now),
    [events]
  );

  const pastEvents = useMemo(
    () =>
      events?.filter((event) => dayjs(event.startDate).add(4, 'hour') < now),
    [events]
  );

  const hasEvents = events?.length > 0;
  const hasActiveEvents = activeEvents?.length > 0;
  const hasPastEvents = pastEvents?.length > 0;

  const highlightedEvents = useMemo(
    () => activeEvents?.reverse().slice(0, 2),
    [activeEvents]
  );

  const placeholderSkeletons = useMemo(
    () =>
      events?.map((event) => (
        <ImageCard
          key={event.id}
          event={event}
          loading={isLoadingOrPlaceholder}
        />
      )),
    [events]
  );

  const highlightedPlaceholderSkeletons = useMemo(
    () =>
      events
        ?.slice(0, 2)
        .map((event) => (
          <HighlightedEventCard
            key={`hl.${event.id}`}
            event={event}
            loading={isLoadingOrPlaceholder}
          />
        )),
    [events]
  );

  const renderEvents = (arr: EventWithOwner[], highlighted = false) =>
    arr?.map((event) =>
      highlighted ? (
        <HighlightedEventCard
          key={`hl.${event.id}`}
          event={event}
          loading={isLoadingOrPlaceholder}
        />
      ) : (
        <ImageCard
          key={`${event.id}`}
          event={event}
          loading={isLoadingOrPlaceholder}
        />
      )
    );

  return {
    hasEvents,
    hasActiveEvents,
    hasPastEvents,
    isLoadingOrPlaceholder,
    activeEvents,
    pastEvents,
    highlightedEvents,
    placeholderSkeletons,
    highlightedPlaceholderSkeletons,
    renderEvents,
  };
};
