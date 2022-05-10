// TODO: create types for nested relations
import { Organization } from '@prisma/client';
import { User } from 'next-auth';

// TODO: for count
export type OrganizationWithUser = Organization & { user: User };
