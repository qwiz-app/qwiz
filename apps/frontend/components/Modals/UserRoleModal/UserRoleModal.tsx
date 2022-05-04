import { Modal } from '@mantine/core';
import { UserRoleModalStep1 } from 'components/Modals/UserRoleModal/UserRoleModalStep1';
import { UserRoleModalStep2 } from 'components/Modals/UserRoleModal/UserRoleModalStep2';
import {
  ModalSteps,
  useUserRoleModal,
} from 'components/Modals/UserRoleModal/use-user-role-modal';

export const UserRoleModal = () => {
  const { modal, setModal } = useUserRoleModal();

  return (
    <>
      <Modal
        withCloseButton={false}
        opened={modal.valueOf() === ModalSteps.Step1}
        onClose={() => setModal(ModalSteps.Null)}
      >
        <UserRoleModalStep1 onContinue={() => setModal(ModalSteps.Step2)} />
      </Modal>
      <Modal
        withCloseButton={false}
        transitionDuration={100}
        opened={modal.valueOf() === ModalSteps.Step2}
        onClose={() => setModal(ModalSteps.Null)}
      >
        <UserRoleModalStep2
          onBack={() => setModal(ModalSteps.Step1)}
          onContinue={() => console.log('test')}
        />
      </Modal>
    </>
  );
};
