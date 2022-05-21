import { Prisma, Quiz, QuizSlide } from '@prisma/client';
import { OrganizationWithUser } from './organization';

export type QuizWithOwner = Quiz & {
  owner: OrganizationWithUser;
  _count?: Prisma.QuizCountOutputType;
};

export type QuizWithSlides = Quiz & {
  owner?: OrganizationWithUser;
  slides: QuizSlide[];
  _count?: Prisma.QuizCountOutputType;
};
