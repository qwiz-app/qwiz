// TODO: create types for nested relations
import { Organization, User } from '@prisma/client';

// TODO: for count
export type OrganizationWithUser = Organization & { user: User };
