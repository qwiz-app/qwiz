import { Title } from '@mantine/core';
import DashboardLayout from 'components/layout/DashboardLayout';

const IndexPage = () => {
  return <Title order={3}>Homepage</Title>;
};

export default IndexPage;

IndexPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
