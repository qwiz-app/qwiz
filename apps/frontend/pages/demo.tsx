import { Group } from '@mantine/core';
import { AppShell } from 'components/UI/AppShell/AppShell';
import React from 'react';

const Demo = (props) => {
  return (
    <AppShell>
      <Group>
        <p className="text-red-600">Hey its me</p>
        <span>matija</span>
      </Group>
    </AppShell>
  );
};

export default Demo;
