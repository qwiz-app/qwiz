import { NoEventsAlert } from 'components/Cards/event/NoEventsAlert';
import PageGrid from 'components/Grids/PageGrid';
import { PageSection } from 'components/PageLayouts/PageSection';
import { useAllEvents } from 'hooks/api/events';
import { useEventsPage } from './use-events-page';

export const EventsAny = () => {
  const {
    hasEvents,
    isLoadingOrPlaceholder,
    activeEvents,
    highlightedEvents,
    placeholderSkeletons,
    highlightedPlaceholderSkeletons,
    renderEvents,
  } = useEventsPage(useAllEvents());

  return (
    <>
      {(hasEvents || isLoadingOrPlaceholder) && (
        <PageSection title="Highlighted events">
          <PageGrid type="eventHighlight">
            {isLoadingOrPlaceholder
              ? highlightedPlaceholderSkeletons
              : renderEvents(highlightedEvents, true)}
          </PageGrid>
        </PageSection>
      )}
      {hasEvents && (
        <PageSection
          title="Active events"
          description="Events happening right now"
        >
          <PageGrid type="event">
            {isLoadingOrPlaceholder
              ? placeholderSkeletons
              : renderEvents(activeEvents)}
          </PageGrid>
          {!hasEvents && <NoEventsAlert />}
        </PageSection>
      )}
    </>
  );
};
