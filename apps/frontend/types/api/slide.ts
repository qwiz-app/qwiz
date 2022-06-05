import {
  Point,
  QuestionContent,
  QuizSlide,
  QuizSlideElement,
} from '@prisma/client';
import { QuizQuestionWithContents } from './question';

// TODO: always empty
export type SlideElementWithQuestionContentAndPoint = QuizSlideElement & {
  point: Point;
  questionContent: QuestionContent;
};

export type SlideWithQuestion = QuizSlide & {
  quizQuestion: QuizQuestionWithContents;
};
