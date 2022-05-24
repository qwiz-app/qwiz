import {
  Prisma,
  Question,
  QuestionCategory,
  QuestionContent,
  QuestionMode,
  QuizQuestion,
  User,
} from '@prisma/client';

export type QuestionWithContent = Question & { contents: QuestionContent[] };

export type QuestionWithContentAndCategoriesAndMode = QuestionWithContent & {
  owner?: User;
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
