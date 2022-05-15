import { useRouter } from 'next/router';
import { useEffect } from 'react';
import create from 'zustand';
import cookieCutter from 'cookie-cutter';

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

  const saveToCookie = () => {
    const date = new Date();
    // !set expiry in 24 hrs
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
    cookieCutter.set('email', email, { expires: date });
  };

  const getFromCookie = () => {
    return cookieCutter.get('email');
  };

  return {
    email,
    setEmail,
    saveToCookie,
    getFromCookie,
  };
};
