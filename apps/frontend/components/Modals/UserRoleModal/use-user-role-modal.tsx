import { useModals } from '@mantine/modals';
import { UserRoleModalStep1 } from './UserRoleModalStep1';
import { UserRoleModalStep2 } from './UserRoleModalStep2';

export const useUserRoleModal = () => {
  const modals = useModals();

  const launchUserRoleModal = () => {
    modals.openConfirmModal({
      title: 'Who are you creating an account for?',
      size: 'md',
      closeOnConfirm: false,
      withCloseButton: false,
      labels: { confirm: 'Continue', cancel: 'Back' },
      children: <UserRoleModalStep1 />,
      onConfirm: () =>
        modals.openConfirmModal({
          withCloseButton: false,
          title: "You're almost ready!",
          labels: { confirm: 'Create account', cancel: 'Back' },
          closeOnConfirm: false,
          children: <UserRoleModalStep2 />,
          onConfirm: () => modals.closeAll(),
        }),
    });
  };

  return {
    launchUserRoleModal,
  };
};
