import { LoadingOverlay, Modal } from '@mantine/core';
import { UserRoleModalStep1 } from 'components/Modals/UserRoleModal/UserRoleModalStep1';
import { UserRoleModalStep2 } from 'components/Modals/UserRoleModal/UserRoleModalStep2';
import {
  ModalSteps,
  useUserRoleModal,
} from 'components/Modals/UserRoleModal/use-user-role-modal';
import { useAssignRole } from 'store/use-assign-role';
import { useRoleAssignAndAccountCreate } from 'hooks/api/role';
import { Prisma, Role } from '@prisma/client';
import { useModalProps } from 'context/mantine';
import { useEffect } from 'react';

export const UserRoleModal = () => {
  const { modal, setModal } = useUserRoleModal();
  const { selectedRole, orgName } = useAssignRole();
  const { mutate, isLoading, isSuccess } = useRoleAssignAndAccountCreate();
  const { modalProps } = useModalProps();

  const submitHandler = () => {
    const role = selectedRole;
    let data = null;

    if (role === Role.ORGANIZER) {
      data = {
        name: orgName,
      } as Prisma.OrganizationCreateInput;
    } else if (role === Role.ATTENDEE) {
      data = {} as Prisma.AttendeeCreateInput;
    }

    mutate({ role, data });
  };

  useEffect(() => {
    if (isSuccess) {
      setModal(ModalSteps.None);
    }
  }, [isSuccess]);

  const closeModalHandler = () => {
    setModal(ModalSteps.None);
  };

  return (
    <Modal
      centered
      {...modalProps}
      withCloseButton={false}
      opened={modal.valueOf() !== ModalSteps.None}
      onClose={closeModalHandler}
    >
      {modal === ModalSteps.Step1 && (
        <UserRoleModalStep1 onContinue={() => setModal(ModalSteps.Step2)} />
      )}
      {modal === ModalSteps.Step2 && (
        <UserRoleModalStep2
          onBack={() => setModal(ModalSteps.Step1)}
          onContinue={submitHandler}
        />
      )}
      <LoadingOverlay visible={isLoading} radius="sm" />
    </Modal>
  );
};
