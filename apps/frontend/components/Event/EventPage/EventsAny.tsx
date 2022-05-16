import { ImageCard } from 'components/Cards/event/EventCard';
import { HighlightedEventCard } from 'components/Cards/event/HighlightedEventCard';
import { NoEventsAlert } from 'components/Cards/event/NoEventsAlert';
import { FramerAnimatedListItem } from 'components/Framer/FramerAnimatedListItem';
import PageGrid from 'components/Grids/PageGrid';
import { PageSection } from 'components/PageLayouts/PageSection';
import dayjs from 'dayjs';
import { useAllEvents } from 'hooks/api/events';
import { useMemo } from 'react';
import { EventWithOrganization } from 'types/event';

export const EventsAny = () => {
  const { data: events, isLoading, isPlaceholderData } = useAllEvents();

  const isLoadingOrPlaceholder = isLoading || isPlaceholderData;

  const hasEvents = events?.length > 0;

  const now = dayjs();

  const activeEvents = useMemo(
    () => events?.filter((event) => dayjs(event.startDate) >= now),
    [events]
  );

  const placeholderSkeletons = useMemo(
    () =>
      events?.map((event) => (
        <FramerAnimatedListItem id={event.id} key={event.id}>
          <ImageCard event={event} loading={isLoadingOrPlaceholder} />
        </FramerAnimatedListItem>
      )),
    [events]
  );

  const renderEvents = (arr: EventWithOrganization[], highlighted = false) =>
    arr?.map((event) => (
      <FramerAnimatedListItem id={`higlight-${event.id}`} key={event.id}>
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

  return (
    hasEvents && (
      <PageSection
        title="Active events"
        description="Events happening right now"
      >
        <PageGrid type="small">
          {isLoadingOrPlaceholder
            ? placeholderSkeletons
            : renderEvents(activeEvents)}
        </PageGrid>
        {!hasEvents && <NoEventsAlert />}
      </PageSection>
    )
  );
};
