import {
  Answer,
  Prisma,
  Question,
  QuestionCategory,
  QuestionContent,
  QuestionMode,
  QuizQuestion,
} from '@prisma/client';
import { OrganizationWithUser } from './organization';

export type QuestionWithContentAndAnswers = Question & {
  contents: QuestionContent[];
  answers: Answer[];
  categories?: QuestionCategory[];
};

export type QuestionWithContentAndCategoriesAndMode =
  QuestionWithContentAndAnswers & {
    owner?: OrganizationWithUser;
    questionMode?: QuestionMode;
  };

export type QuestionCreateWithContentInput = Prisma.QuestionCreateInput & {
  contents: Prisma.QuestionContentCreateWithoutQuestionInput[];
  answers?: Prisma.AnswerCreateInput[];
  categories?: Prisma.QuestionCategoryWhereUniqueInput[];
};

export type QuizQuestionWithContents = QuizQuestion & {
  question: QuestionWithContentAndAnswers;
};
