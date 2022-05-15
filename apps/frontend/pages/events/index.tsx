import { ImageCard } from 'components/Cards/event/EventCard';
import { HighlightedEventCard } from 'components/Cards/event/HighlightedEventCard';
import { NoEventsAlert } from 'components/Cards/event/NoEventsAlert';
import { FramerAnimatedListItem } from 'components/Framer/FramerAnimatedListItem';
import PageGrid from 'components/Grids/PageGrid';
import DashboardLayout from 'components/Layouts/DashboardLayout';
import { HomepageLayout } from 'components/PageLayouts/HomepageLayout';
import { PageSection } from 'components/PageLayouts/PageSection';
import dayjs from 'dayjs';
import { useEvents } from 'hooks/api/events';
import { useMemo } from 'react';
import { EventWithOrganization } from 'types/event';

const EventsPage = () => {
  const { data: events, isLoading, isPlaceholderData } = useEvents();

  const isLoadingOrPlaceholder = isLoading || isPlaceholderData;

  const hasEvents = events?.length > 0;

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

  const highlightedEvents = useMemo(
    () => activeEvents?.reverse().slice(0, 1),
    [activeEvents]
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

  const highlightedPlaceholderSkeletons = useMemo(
    () =>
      events?.slice(0, 1).map((event) => (
        <FramerAnimatedListItem id={event.id} key={event.id}>
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
      <FramerAnimatedListItem id={event.id} key={event.id}>
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
    <HomepageLayout>
      {(hasEvents || isLoadingOrPlaceholder) && (
        <PageSection title="Highlighted event">
          <PageGrid type="big">
            {isLoadingOrPlaceholder
              ? highlightedPlaceholderSkeletons
              : renderEvents(highlightedEvents, true)}
          </PageGrid>
        </PageSection>
      )}
      <PageSection
        title="Your events"
        description="All of your incoming events"
      >
        <PageGrid type="small">
          {isLoadingOrPlaceholder
            ? placeholderSkeletons
            : renderEvents(activeEvents)}
        </PageGrid>
        {!hasEvents && <NoEventsAlert />}
      </PageSection>
      {hasEvents && (
        <PageSection
          title="Past events"
          description="All of your finished events"
        >
          <PageGrid type="small">
            {isLoadingOrPlaceholder
              ? placeholderSkeletons
              : renderEvents(pastEvents)}
          </PageGrid>
          {!hasEvents && <NoEventsAlert />}
        </PageSection>
      )}
    </HomepageLayout>
  );
};

export default EventsPage;

EventsPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
