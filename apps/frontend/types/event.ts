import { Quiz } from '@prisma/client';
import { OrganizationWithUser } from './organization';

export type EventWithOrganization = Quiz & {
  owner: OrganizationWithUser;
};
