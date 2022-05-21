import { Organization, Prisma, Quiz, User } from '@prisma/client';

export type OrganizationWithUser = Organization & {
  user: User;
  count?: Prisma.OrganizationCountOutputType;
};

export type OrganizationWithUserAndEventsAndQuizzes = OrganizationWithUser & {
  events: Event[];
  quizzes?: Quiz[];
  count?: Prisma.OrganizationCountOutputType;
};
