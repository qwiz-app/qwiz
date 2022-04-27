// TODO: check rule?
/* eslint-disable react-hooks/rules-of-hooks */
import { Role } from '@prisma/client';
import create from 'zustand';

export type UserRoleStore = {
  selectedRole: Role | null;
  orgName: string;
  setOrgName: (role: string) => void;
  setSelectedRole: (role: Role | null) => void;
};

const useStore = create<UserRoleStore>((set) => ({
  selectedRole: null,
  orgName: '',
  setOrgName: (role) => set((state) => ({ ...state, orgName: role })),
  setSelectedRole: (selectedRole: Role) =>
    set((state) => ({ ...state, selectedRole })),
}));

export const useAssignRole = () => {
  const selectedRole = useStore((state) => state.selectedRole);
  const setSelectedRole = useStore((state) => state.setSelectedRole);

  const orgName = useStore((state) => state.orgName);
  const setOrgName = useStore((state) => state.setOrgName);

  return { selectedRole, setSelectedRole, orgName, setOrgName };
};
