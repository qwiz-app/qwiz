import { EventBanner } from 'components/Cards/event/EventBanner';
import { ImageCard } from 'components/Cards/event/EventCard';
import { HighlightedEventCard } from 'components/Cards/event/HighlightedEventCard';
import { FramerAnimatedListItem } from 'components/Framer/FramerAnimatedListItem';
import PageGrid from 'components/Grids/PageGrid';
import DashboardLayout from 'components/Layouts/DashboardLayout';
import { HomepageLayout } from 'components/PageLayouts/HomepageLayout';
import { PageSection } from 'components/PageLayouts/PageSection';
import { useEvents } from 'hooks/api/events';
import { useEffect } from 'react';

const EventsPage = () => {
  const { data: events, isLoading, isPlaceholderData } = useEvents();

  useEffect(() => {
    console.log(events);
  }, [events]);
  // const hasEvents = events?.length > 0;

  return (
    <HomepageLayout>
      <PageSection title="Incoming events">
        <PageGrid type="big">
          {events?.slice(0, 2).map((event, i) => (
            <HighlightedEventCard
              key={event.id}
              event={event}
              loading={isLoading || isPlaceholderData}
            />
          ))}
        </PageGrid>
      </PageSection>
      <PageSection
        title="Your events"
        description="Consequatur aut repellat dolores distinctio quo voluptas minima et."
      >
        <PageGrid type="small">
          {events?.map((event) => (
            // TODO: formik not working
            <FramerAnimatedListItem id={event.id} key={event.id}>
              <ImageCard
                event={event}
                loading={isLoading || isPlaceholderData}
              />
            </FramerAnimatedListItem>
          ))}
        </PageGrid>
      </PageSection>
      {/* TODO: highlighted event */}
      <PageSection>
        <EventBanner />
      </PageSection>
    </HomepageLayout>
  );
};

export default EventsPage;

EventsPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
