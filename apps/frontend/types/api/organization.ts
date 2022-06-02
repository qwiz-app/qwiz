import { Organization, Prisma, Quiz, User } from '@prisma/client';

export type OrganizationWithUser = Organization & {
  user: User;
  _count?: Prisma.OrganizationCountOutputType;
};

export type OrganizationWithUserAndEventsAndQuizzes = OrganizationWithUser & {
  events: Event[];
  quizzes?: Quiz[];
  _count?: Prisma.OrganizationCountOutputType;
};
