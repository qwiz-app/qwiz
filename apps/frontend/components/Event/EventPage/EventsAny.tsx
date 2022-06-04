import { NoEventsAlert } from 'components/Cards/event/NoEventsAlert';
import PageGrid from 'components/Grids/PageGrid';
import { PageSection } from 'components/PageLayouts/PageSection';
import { useAllEvents } from 'hooks/api/events';
import { useCurrentUser } from 'hooks/api/users';
import { useEventsPage } from './use-events-page';

export const EventsAny = () => {
  const { isLoading, isSessionLoading } = useCurrentUser();
  const {
    hasEvents,
    isLoadingOrPlaceholder,
    activeEvents,
    highlightedEvents,
    placeholderSkeletons,
    highlightedPlaceholderSkeletons,
    renderEvents,
  } = useEventsPage(useAllEvents());

  const loading = isLoading || isSessionLoading || isLoadingOrPlaceholder;
  return (
    <>
      {(hasEvents || loading) && (
        <PageSection
          title="Highlighted events"
          description="Events you're gonna love"
        >
          <PageGrid type="eventHighlight">
            {loading
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
            {loading ? placeholderSkeletons : renderEvents(activeEvents)}
          </PageGrid>
          {!hasEvents && <NoEventsAlert />}
        </PageSection>
      )}
    </>
  );
};
