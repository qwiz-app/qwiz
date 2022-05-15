import { useRouter } from 'next/router';
import { useEffect } from 'react';
import create from 'zustand';

type EmailStore = {
  email: string;
  setEmail: (email: string) => void;
};

const useStore = create<EmailStore>((set) => ({
  email: '',
  setEmail: (role) => set((state) => ({ ...state, email: role })),
}));

export const useResendEmail = () => {
  const router = useRouter();

  const email = useStore((state) => state.email);
  const setEmail = useStore((state) => state.setEmail);

  useEffect(() => {
    if (router.query.email) {
      setEmail(router.query.email as string);
    }
  }, [router]);

  return {
    email,
    setEmail,
  };
};
