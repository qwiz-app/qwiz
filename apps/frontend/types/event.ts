import { Event } from '@prisma/client';
// eslint-disable-next-line import/no-cycle
import { OrganizationWithUser } from './organization';

export type EventWithOrganization = Event & {
  owner: OrganizationWithUser;
};
