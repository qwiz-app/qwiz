import { Modal } from '@mantine/core';
import { UserRoleModalStep1 } from 'components/Modals/UserRoleModal/UserRoleModalStep1';
import { UserRoleModalStep2 } from 'components/Modals/UserRoleModal/UserRoleModalStep2';
import {
  ModalSteps,
  useUserRoleModal,
} from 'components/Modals/UserRoleModal/use-user-role-modal';
import { useAssignRole } from 'store/use-assign-role';

export const UserRoleModal = () => {
  const { modal, setModal } = useUserRoleModal();
  const { selectedRole, orgName } = useAssignRole();

  const submitHandler = () => {
    setModal(ModalSteps.Null);
    console.log(orgName, selectedRole);
  };

  return (
    <Modal
      centered
      withCloseButton={false}
      opened={modal.valueOf() !== ModalSteps.Null}
      onClose={() => setModal(ModalSteps.Null)}
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
    </Modal>
  );
};
