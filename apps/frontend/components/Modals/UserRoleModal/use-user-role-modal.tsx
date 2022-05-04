import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export enum ModalSteps {
  Step1,
  Step2,
  Null,
}

export const useUserRoleModal = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.query.assign) {
      setModal(ModalSteps.Step1);
    }
  }, [router.query.assign]);

  const [modal, setModal] = useState(ModalSteps.Null);

  return { modal, setModal };
};
