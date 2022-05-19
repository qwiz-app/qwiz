import { Container } from '@mantine/core';
import DashboardLayout from 'components/Layouts/DashboardLayout';
import OrganizationEvents from 'components/Organization/OrganizationEvents';
import { OrganizationHeader } from 'components/Organization/OrganizationHeader';
import { useOrganization } from 'hooks/api/organizations';
import { useRouter } from 'next/router';

const OrganizationPage = () => {
  const router = useRouter();
  const { organizationId } = router.query;
  const { data: organization, isLoading } = useOrganization(
    organizationId as string
  );

  return (
    <Container size="lg">
      <OrganizationHeader organization={organization} loading={isLoading} />
      <OrganizationEvents events={organization?.events} loading={isLoading} />
    </Container>
  );
};

export default OrganizationPage;

OrganizationPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
