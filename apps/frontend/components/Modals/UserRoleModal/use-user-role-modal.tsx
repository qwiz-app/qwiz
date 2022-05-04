import { useEffect, useState } from 'react';
import { useCurrentUser } from 'hooks/api/session';

export enum ModalSteps {
  Step1,
  Step2,
  Null,
}

export const useUserRoleModal = () => {
  const [modal, setModal] = useState(ModalSteps.Null);

  const user = useCurrentUser();

  useEffect(() => {
    if (user && !user.role) {
      setModal(ModalSteps.Step1);
    }
  }, [user]);


  return { modal, setModal };
};
