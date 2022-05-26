import {
  Prisma,
  Question,
  QuestionCategory,
  QuestionContent,
  QuestionMode,
  QuizQuestion,
} from '@prisma/client';
import { OrganizationWithUser } from './organization';

export type QuestionWithContent = Question & { contents: QuestionContent[] };

export type QuestionWithContentAndCategoriesAndMode = QuestionWithContent & {
  owner?: OrganizationWithUser;
  categories?: QuestionCategory[];
  questionMode?: QuestionMode;
};

export type QuestionCreateWithContentInput = Prisma.QuestionCreateInput & {
  contents: Prisma.QuestionContentCreateWithoutQuestionInput[];
  categories?: Prisma.QuestionCategoryWhereUniqueInput[];
};

export type QuizQuestionWithContents = QuizQuestion & {
  question: QuestionWithContent;
};
