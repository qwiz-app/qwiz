import { LoadingOverlay, Modal } from '@mantine/core';
import { Prisma, Role } from '@prisma/client';
import {
  ModalSteps,
  useUserRoleModal,
} from 'components/Modals/UserRoleModal/use-user-role-modal';
import { UserRoleModalStep1 } from 'components/Modals/UserRoleModal/UserRoleModalStep1';
import { UserRoleModalStep2 } from 'components/Modals/UserRoleModal/UserRoleModalStep2';
import { useModalProps } from 'context/mantine';
import { useRoleAssignAndAccountCreate } from 'hooks/api/role';
import { useEffect } from 'react';
import { useAssignRole } from 'store/use-assign-role';
import { UserRoleReq } from 'types/api/role';

export const UserRoleModal = () => {
  const { modal, setModal } = useUserRoleModal();
  const { selectedRole, orgName, avatar } = useAssignRole();
  const { mutate, isLoading, isSuccess } = useRoleAssignAndAccountCreate();
  const { modalProps } = useModalProps();

  const submitHandler = () => {
    const role = selectedRole;
    let data = null;

    if (role === Role.ORGANIZATION) {
      data = { name: orgName } as Prisma.OrganizationCreateInput;
    } else if (role === Role.ATTENDEE) {
      data = {} as Prisma.AttendeeCreateInput;
    }

    const mutationData: UserRoleReq = { role, data };
    if (avatar) {
      mutationData.image = avatar;
    }

    mutate(mutationData);
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
      closeOnClickOutside={false}
      closeOnEscape={false}
      withCloseButton={false}
      opened={modal.valueOf() !== ModalSteps.None}
      onClose={closeModalHandler}
      title="Choose a role"
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
      <LoadingOverlay visible={isLoading} radius="md" />
    </Modal>
  );
};
