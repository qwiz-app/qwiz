import { ImageCard } from 'components/Cards/event/EventCard';
import { FramerAnimatedListItem } from 'components/Framer/FramerAnimatedListItem';
import PageGrid from 'components/Grids/PageGrid';
import { PageSection } from 'components/PageLayouts/PageSection';
import { useMemo } from 'react';
import { EventWithOwner } from 'types/api/event';

interface Props {
  events: EventWithOwner[];
  loading: boolean;
}
const OrganizationEvents = ({ events, loading }: Props) => {
  const renderEvents = (arr: EventWithOwner[]) =>
    arr?.map((event) => (
      <FramerAnimatedListItem id={event.id} key={event.id}>
        <ImageCard event={event} loading={loading} />
      </FramerAnimatedListItem>
    ));

  const placeholderSkeletons = useMemo(
    () =>
      events?.map((event) => (
        <FramerAnimatedListItem id={event.id} key={event.id}>
          <ImageCard event={event} loading={loading} />
        </FramerAnimatedListItem>
      )),
    [events]
  );

  return (
    <PageSection title="All events" description="All of their events">
      <PageGrid type="small">
        {loading ? placeholderSkeletons : renderEvents(events)}
      </PageGrid>
    </PageSection>
  );
};

export default OrganizationEvents;
