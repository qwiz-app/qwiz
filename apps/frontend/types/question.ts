import { Organization, Question, QuestionContent, User } from '@prisma/client';

export type QuestionWithContent = Question & { content: QuestionContent };
export type QuestionWithContentAndOwnerAndCategories = QuestionWithContent & {
  owner?: User;
  categories?: Organization[];
};
