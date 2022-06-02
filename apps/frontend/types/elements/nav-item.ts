import { Role } from '@prisma/client';
import { ReactNode } from 'react';

export type NavItemModel = {
  icon: ReactNode;
  label?: string;
  href?: string;
  color?: string;
  onClick?: () => void;
  onSelect?: () => void;
  children?: ReactNode;
  btnClass?: string;
  permissions?: Role[];
};
