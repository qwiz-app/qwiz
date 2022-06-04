import DashboardLayout from 'components/Layouts/DashboardLayout';
import React from 'react';

const TeamNewPage = (props) => {
  return <div>create team</div>;
};

export default TeamNewPage;

TeamNewPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
