import { Text } from '@mantine/core';
import { useModals } from '@mantine/modals';

type Props = {
  onConfirm: () => void;
  deletedEntity?: string;
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
};

export const useDeleteConfirmModal = ({
  onConfirm,
  deletedEntity,
  title,
  message,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
}: Props) => {
  const modals = useModals();

  return () =>
    modals.openConfirmModal({
      title: title || 'Please confirm your action',
      children: (
        <Text size="sm">
          {message || `Are you sure you want to delete this ${deletedEntity}?`}
        </Text>
      ),
      labels: { confirm: confirmLabel, cancel: cancelLabel },
      onConfirm,
      confirmProps: { color: 'red' },
    });
};
