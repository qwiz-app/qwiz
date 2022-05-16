import { NoEventsAlert } from 'components/Cards/event/NoEventsAlert';
import PageGrid from 'components/Grids/PageGrid';
import { PageSection } from 'components/PageLayouts/PageSection';
import { useEvents } from 'hooks/api/events';
import { useEventsPage } from './use-events-page';

export const EventsCurrentOrganization = () => {
  const {
    hasEvents,
    isLoadingOrPlaceholder,
    activeEvents,
    pastEvents,
    highlightedEvents,
    placeholderSkeletons,
    highlightedPlaceholderSkeletons,
    renderEvents,
  } = useEventsPage(useEvents());

  return (
    <>
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
    </>
  );
};
