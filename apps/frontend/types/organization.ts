// TODO: create types for nested relations
import { Organization, Quiz, User } from '@prisma/client';

// TODO: for count
export type OrganizationWithUser = Organization & { user: User };
export type OrganizationWithUserAndEventsAndQuizzes = OrganizationWithUser & {
  events: Event[];
  quizzes: Quiz[];
};
