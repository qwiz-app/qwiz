import { Event } from '@prisma/client';
import { OrganizationWithUser } from './organization';

export type EventWithOrganization = Event & {
  owner: OrganizationWithUser;
};
