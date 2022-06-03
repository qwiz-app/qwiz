import { AxiosError } from 'axios';
import { ImageCard } from 'components/Cards/event/EventCard';
import { HighlightedEventCard } from 'components/Cards/event/HighlightedEventCard';
import { FramerAnimatedListItem } from 'components/Framer/FramerAnimatedListItem';
import dayjs from 'dayjs';
import { useCurrentUser } from 'hooks/api/users';
import { useMemo } from 'react';
import { UseQueryResult } from 'react-query';
import { EventWithOwner } from 'types/api/event';

export const useEventsPage = ({
  data: events,
  isPlaceholderData,
  isLoading,
}: UseQueryResult<EventWithOwner[], AxiosError<unknown, unknown>>) => {
  const { isOrganization, isLoading: sessionLoading } = useCurrentUser();

  const isLoadingOrPlaceholder = isLoading || isPlaceholderData;
  const now = dayjs();

  const isOrgOrLoading = isOrganization || sessionLoading;

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
        <FramerAnimatedListItem
          id={`${isOrgOrLoading && 'org.'}${event.id}`}
          key={`${isOrgOrLoading && 'org.'}${event.id}`}
        >
          <ImageCard event={event} loading={isLoadingOrPlaceholder} />
        </FramerAnimatedListItem>
      )),
    [events]
  );

  const highlightedPlaceholderSkeletons = useMemo(
    () =>
      events?.slice(0, 2).map((event) => (
        <FramerAnimatedListItem
          id={`higlight.${isOrgOrLoading && 'org.'}${event.id}`}
          key={`higlight.${isOrgOrLoading && 'org.'}${event.id}`}
        >
          <HighlightedEventCard
            event={event}
            loading={isLoadingOrPlaceholder}
          />
        </FramerAnimatedListItem>
      )),
    [events]
  );

  const renderEvents = (arr: EventWithOwner[], highlighted = false) =>
    arr?.map((event) => (
      <FramerAnimatedListItem
        id={`${highlighted && 'higlight.'}${isOrgOrLoading && 'org.'}${
          event.id
        }`}
        key={`${highlighted && 'higlight.'}${isOrgOrLoading && 'org.'}${
          event.id
        }`}
      >
        {highlighted ? (
          <HighlightedEventCard
            event={event}
            loading={isLoadingOrPlaceholder}
          />
        ) : (
          <ImageCard event={event} loading={isLoadingOrPlaceholder} />
        )}
      </FramerAnimatedListItem>
    ));

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
