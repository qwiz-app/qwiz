import { Button } from '@mantine/core';
import { NoEventsAlert } from 'components/Cards/event/NoEventsAlert';
import PageGrid from 'components/Grids/PageGrid';
import { PageSection } from 'components/PageLayouts/PageSection';
import { useEvents } from 'hooks/api/events';
import { useBreakpoints } from 'hooks/breakpoints';
import { useAppColorscheme } from 'hooks/colorscheme';
import { useCreateEventCheck } from 'hooks/use-create-event-check';
import { PlusCircle } from 'phosphor-react';
import { useEventsPage } from './use-events-page';

export const EventsCurrentOrganization = () => {
  const { isDark } = useAppColorscheme();
  const {
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
  } = useEventsPage(useEvents());
  const { navigateToCreateEvent } = useCreateEventCheck();
  const { matches } = useBreakpoints();

  return (
    <>
      {(hasEvents || isLoadingOrPlaceholder) && (
        <PageSection
          title="Your highlighted events"
          rightSlot={
            hasEvents &&
            !isLoadingOrPlaceholder && (
              <Button
                ml="auto"
                color="orange"
                variant={isDark ? 'light' : 'filled'}
                rightIcon={<PlusCircle size={20} weight="duotone" />}
                size="md"
                onClick={navigateToCreateEvent}
                fullWidth={matches.max.sm}
              >
                Create an event
              </Button>
            )
          }
        >
          <PageGrid type="eventHighlight">
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
        <PageGrid type="event">
          {isLoadingOrPlaceholder
            ? placeholderSkeletons
            : renderEvents(activeEvents)}
        </PageGrid>
        {!hasActiveEvents && !isLoadingOrPlaceholder && <NoEventsAlert />}
      </PageSection>
      {hasPastEvents && (
        <PageSection
          title="Past events"
          description="All of your finished events"
        >
          <PageGrid type="event">
            {isLoadingOrPlaceholder
              ? placeholderSkeletons
              : renderEvents(pastEvents)}
          </PageGrid>
        </PageSection>
      )}
    </>
  );
};
