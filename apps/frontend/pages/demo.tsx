import { Group } from '@mantine/core';
import DashboardLayout from 'components/layout/DashboardLayout';
import React from 'react';

const Demo = (props) => {
  return (
    <Group>
      <p className="text-red-600">Hey its me</p>
      <span>matija</span>
    </Group>
  );
};

export default Demo;

Demo.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
