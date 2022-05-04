import { useEffect, useState } from 'react';
import { useCurrentUser } from 'hooks/api/session';

export enum ModalSteps {
  None,
  Step1,
  Step2,
}

export const useUserRoleModal = () => {
  const [modal, setModal] = useState(ModalSteps.None);

  const user = useCurrentUser();

  useEffect(() => {
    if (user && !user.role) {
      setModal(ModalSteps.Step1);
    }
  }, [user]);

  return { modal, setModal };
};
