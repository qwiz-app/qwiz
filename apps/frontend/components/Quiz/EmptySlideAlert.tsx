import { Alert } from '@mantine/core';
import { WarningCircle } from 'phosphor-react';

export const EmptySlideAlert = (props) => {
  return (
    <Alert
      icon={<WarningCircle size={16} />}
      title="Empty slide"
      radius="md"
      variant="light"
      mt="sm"
      sx={() => ({
        maxWidth: 350,
      })}
    >
      Slide has no question assigned.
    </Alert>
  );
};

