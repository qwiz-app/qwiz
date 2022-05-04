import { useModals } from '@mantine/modals';
import { useAssignRole } from 'store/use-assign-role';
import { UserRoleModalStep1 } from './UserRoleModalStep1';
import { UserRoleModalStep2 } from './UserRoleModalStep2';

export const useUserRoleModal = () => {
  const modals = useModals();
  const { selectedRole, orgName } = useAssignRole();

  const onConfirmHandler = () => {
    console.log('selectedRole :>> ', selectedRole);
    console.log('orgName :>> ', orgName);
    modals.closeAll();
  };

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
          onConfirm: () => onConfirmHandler(),
        }),
    });
  };

  return {
    launchUserRoleModal,
  };
};
