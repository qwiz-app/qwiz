import { Group, Text } from '@mantine/core';
import DashboardLayout from 'components/layout/DashboardLayout';
import React from 'react';

const Demo = (props) => {
  return (
    <Group>
      <Text size="xl">Hey its me</Text>
    </Group>
  );
};

export default Demo;

Demo.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
