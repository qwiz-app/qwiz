/* eslint-disable @typescript-eslint/no-empty-function */
import { Text } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { Role } from '@prisma/client';
import { useEffect, useState } from 'react';
import { UserRoleModalStep1 } from './UserRoleModalStep1';

export const useUserRoleModal = () => {
  const modals = useModals();

  const [selectedRole, setSelectedRole] = useState<Role>(null);

  useEffect(() => {
    console.log('modal role', selectedRole);
  }, [selectedRole]);

  const launchUserRoleModal = () => {
    setSelectedRole(Role.ORGANIZER);
    console.log('is it launched', selectedRole);
    modals.openConfirmModal({
      title: 'Who are you creating an account for?',
      closeOnConfirm: false,
      closeOnCancel: false,
      closeOnClickOutside: true,
      closeOnEscape: false,
      centered: true,
      withCloseButton: false,
      onClose() {
        setSelectedRole(Role.ORGANIZER);
      },
      labels: { confirm: 'Continue', cancel: 'Clear' },
      children: (
        <div>
          <UserRoleModalStep1
            selectedRole={selectedRole}
            onSelectRole={setSelectedRole}
          />
          modal role: {selectedRole}
        </div>
      ),
      onConfirm: () =>
        // TODO: show diff modal based on chosen role
        modals.openConfirmModal({
          title: 'This is modal at second layer',
          labels: { confirm: 'Create account', cancel: 'Back' },
          closeOnConfirm: false,
          centered: true,
          children: (
            <Text size="sm">
              When this modal is closed modals state will revert to first modal
            </Text>
          ),
          onConfirm: () => modals.closeAll(),
        }),
    });
  };

  return {
    launchUserRoleModal,
  };
};
