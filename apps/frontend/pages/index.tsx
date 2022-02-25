import DashboardLayout from 'components/layout/DashboardLayout';
import { useState } from 'react';

const Index = () => {
  return <h1>Homepage</h1>;
};

export default Index;

Index.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
