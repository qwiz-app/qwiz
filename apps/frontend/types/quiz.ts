import { Prisma, Quiz } from '@prisma/client';
import { OrganizationWithUser } from './organization';
import { SlideWithQuestionAndElements } from './slide';

export type QuizWithOrganization = Quiz & {
  owner: OrganizationWithUser;
  slides?: SlideWithQuestionAndElements[];
  _count: Prisma.QuizCountOutputType;
};
