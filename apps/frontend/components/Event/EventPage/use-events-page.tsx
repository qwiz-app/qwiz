import { AxiosError } from 'axios';
import { ImageCard } from 'components/Cards/event/EventCard';
import { HighlightedEventCard } from 'components/Cards/event/HighlightedEventCard';
import { FramerAnimatedListItem } from 'components/Framer/FramerAnimatedListItem';
import dayjs from 'dayjs';
import { useCurrentSession } from 'hooks/api/session';
import { useMemo } from 'react';
import { UseQueryResult } from 'react-query';
import { EventWithOrganization } from 'types/event';

export const useEventsPage = ({
  data: events,
  isPlaceholderData,
  isLoading,
}: UseQueryResult<EventWithOrganization[], AxiosError<any, any>>) => {
  const { isOrganization, isLoading: sessionLoading } = useCurrentSession();

  const hasEvents = events?.length > 0;
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

  const renderEvents = (arr: EventWithOrganization[], highlighted = false) =>
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
    isLoadingOrPlaceholder,
    activeEvents,
    pastEvents,
    highlightedEvents,
    placeholderSkeletons,
    highlightedPlaceholderSkeletons,
    renderEvents,
  };
};
