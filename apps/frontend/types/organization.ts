// TODO: create types for nested relations
import { Organization, Quiz } from '@prisma/client';
import { User } from 'next-auth';

// TODO: for count
export type OrganizationWithUser = Organization & { user: User };
export type QuizWithOrganization = Quiz & {
  owner: OrganizationWithUser;
};
