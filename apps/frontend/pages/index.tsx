import { Container, Paper } from '@mantine/core';
import { OrganizationDashboard } from 'components/Dashboard/OrganizationDashboard';
import DashboardLayout from 'components/Layouts/DashboardLayout';
import { HomepageLayout } from 'components/PageLayouts/HomepageLayout';
import { useCurrentUser } from 'hooks/api/users';

const IndexPage = () => {
  const { isOrganization } = useCurrentUser();

  return (
    <Container size="xl">
      <HomepageLayout>
        {isOrganization && <OrganizationDashboard />}
        {!isOrganization && <Paper>In progress...</Paper>}
      </HomepageLayout>
    </Container>
  );
};

export default IndexPage;

IndexPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
