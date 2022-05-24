import { Event, Prisma } from '@prisma/client';
import { OrganizationWithUser } from './organization';

export type EventWithOwner = Event & {
  owner: OrganizationWithUser;
  count?: Prisma.EventCountOutputType;
};
