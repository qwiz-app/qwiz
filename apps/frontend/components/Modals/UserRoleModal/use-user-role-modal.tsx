import { useCurrentUser } from 'hooks/api/users';
import { useEffect, useState } from 'react';

export enum ModalSteps {
  None,
  Step1,
  Step2,
}

export const useUserRoleModal = () => {
  const { user } = useCurrentUser();

  const [modal, setModal] = useState(ModalSteps.None);

  useEffect(() => {
    if (user && !user.role) {
      setModal(ModalSteps.Step1);
    }
  }, [user]);

  return { modal, setModal };
};
