import { useModals } from '@mantine/modals';
import { UserRoleModalStep1 } from './UserRoleModalStep1';
import { UserRoleModalStep2 } from './UserRoleModalStep2';

export const useUserRoleModal = () => {
  const modals = useModals();

  const launchUserRoleModal = () => {
    modals.openConfirmModal({
      title: 'Who are you creating an account for?',
      closeOnConfirm: false,
      closeOnCancel: true,
      closeOnClickOutside: true,
      closeOnEscape: true,
      centered: true,
      withCloseButton: true,
      onClose() {
        console.log('close modal');
      },
      labels: { confirm: 'Continue', cancel: 'Back' },
      children: <UserRoleModalStep1 />,
      onConfirm: () =>
        modals.openConfirmModal({
          title: "You're almost ready",
          labels: { confirm: 'Create account', cancel: 'Back' },
          closeOnConfirm: false,
          centered: true,
          children: <UserRoleModalStep2 />,
          onConfirm: () => modals.closeAll(),
        }),
    });
  };

  return {
    launchUserRoleModal,
  };
};
