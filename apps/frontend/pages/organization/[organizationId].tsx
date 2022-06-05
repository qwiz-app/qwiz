import { Container, Stack } from '@mantine/core';
import DashboardLayout from 'components/Layouts/DashboardLayout';
import OrganizationEvents from 'components/Organization/OrganizationEvents';
import { OrganizationHeader } from 'components/Organization/OrganizationHeader';
import { useEventsByOrganization } from 'hooks/api/events';
import { useOrganization } from 'hooks/api/organizations';
import { useRouter } from 'next/router';

const OrganizationPage = () => {
  const router = useRouter();
  const organizationId = router.query.organizationId as string;

  const {
    data: organization,
    isLoading,
    isPlaceholderData,
  } = useOrganization(organizationId);

  const {
    data: events,
    isLoading: isEventsLoading,
    isPlaceholderData: isEventsPlaceholderData,
  } = useEventsByOrganization(organizationId);

  return (
    <Container size="lg" p={0}>
      <Stack spacing={64}>
        <OrganizationHeader
          organization={organization}
          loading={isLoading || isPlaceholderData}
        />
        <OrganizationEvents
          events={events}
          loading={isEventsLoading || isEventsPlaceholderData}
        />
      </Stack>
    </Container>
  );
};

export default OrganizationPage;

OrganizationPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
