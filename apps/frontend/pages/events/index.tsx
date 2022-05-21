import { EventsAny } from 'components/Event/EventPage/EventsAny';
import { EventsCurrentOrganization } from 'components/Event/EventPage/EventsCurrentOrganization';
import DashboardLayout from 'components/Layouts/DashboardLayout';
import { HomepageLayout } from 'components/PageLayouts/HomepageLayout';
import { useCurrentUser } from 'hooks/api/users';

const EventsPage = () => {
  const { isOrganization, isLoading } = useCurrentUser();

  // TODO: isnt working live, shows all after inital organization account creation
  return (
    <HomepageLayout>
      {isOrganization || isLoading ? (
        <EventsCurrentOrganization />
      ) : (
        <EventsAny />
      )}
    </HomepageLayout>
  );
};

export default EventsPage;

EventsPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
