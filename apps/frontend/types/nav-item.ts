import { Role } from '@prisma/client';
import { ReactNode } from 'react';

// TODO: move to types
export type NavItemModel = {
  icon: ReactNode;
  label?: string;
  href?: string;
  color?: string;
  onClick?: () => void;
  children?: ReactNode;
  btnClass?: string;
  permissions?: Role[];
};
