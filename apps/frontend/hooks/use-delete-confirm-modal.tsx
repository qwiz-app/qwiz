import { Text } from '@mantine/core';
import { useModals } from '@mantine/modals';

interface Props {
  onConfirm: () => void;
  deletedEntity: string;
}

export const useDeleteConfirmModal = ({ onConfirm, deletedEntity }: Props) => {
  const modals = useModals();

  return () =>
    modals.openConfirmModal({
      title: 'Please confirm your action',
      children: (
        <Text size="sm">
          Do you really want to delete this {deletedEntity}?
        </Text>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      onConfirm,
      confirmProps: { color: 'red' },
    });
};
