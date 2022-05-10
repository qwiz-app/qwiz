import { Quiz } from '@prisma/client';
import { OrganizationWithUser } from './organization';

export type QuizWithOrganization = Quiz & {
  owner: OrganizationWithUser;
};
