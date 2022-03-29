import { Question } from '@prisma/client';

export type CreateQuestionDto = Omit<Question, 'id'>;
