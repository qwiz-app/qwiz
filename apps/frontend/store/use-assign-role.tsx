// TODO: check rule?
/* eslint-disable react-hooks/rules-of-hooks */
import { Role } from '@prisma/client';
import create from 'zustand';

export type UserRoleStore = {
  selectedRole: Role | null;
  setSelectedRole: (role: Role | null) => void;
};

const useStore = create<UserRoleStore>((set) => ({
  selectedRole: null,
  setSelectedRole: (selectedRole: Role) =>
    set((state) => ({ ...state, selectedRole })),
}));

export const useAssignRole = () => {
  const selectedRole = useStore((state) => state.selectedRole);
  const setSelectedRole = useStore((state) => state.setSelectedRole);

  return { selectedRole, setSelectedRole };
};
