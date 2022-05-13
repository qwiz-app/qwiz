import {
  Prisma,
  Question,
  QuestionCategory,
  QuestionContent,
  QuestionMode,
  User,
} from '@prisma/client';

export type QuestionWithContent = Question & { content: QuestionContent };
export type QuestionWithContentAndOwnerAndCategoriesAndMode =
  QuestionWithContent & {
    owner?: User;
    categories?: QuestionCategory[];
    questionMode?: QuestionMode;
  };

export type QuestionCreateWithContentInput = Prisma.QuestionCreateInput & {
  contents: Prisma.QuestionContentCreateWithoutQuestionInput[];
};
