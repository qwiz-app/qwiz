import { Button } from '@mantine/core';
import { TrashSimple } from 'phosphor-react';
import { SidePanelWrapper } from './SidePanelWrapper';

export const SidePanelSettings = (props) => {
  return (
    <SidePanelWrapper title="Settings">
      <Button
        rightIcon={<TrashSimple size={24} weight="duotone" />}
        size="md"
        color="red"
      >
        Delete quiz
      </Button>
    </SidePanelWrapper>
  );
};
