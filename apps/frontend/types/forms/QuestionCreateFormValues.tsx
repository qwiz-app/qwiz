import { Prisma } from '@prisma/client';

export type QuestionCreateFormValues = {
  textuals: Prisma.QuestionContentCreateWithoutQuestionInput[];
  images: Prisma.QuestionContentCreateWithoutQuestionInput[];
  categories?: string[];
  answers?: Prisma.AnswerCreateWithoutQuestionInput[];
};
