import {
  Point,
  QuestionContent,
  QuizSlide,
  QuizSlideElement,
} from '@prisma/client';
import { QuizQuestionWithContents } from './question';

export type SlideElementWithQuestionContentAndPoint = QuizSlideElement & {
  point: Point;
  questionContent: QuestionContent;
};

export type SlideWithQuestionAndElements = QuizSlide & {
  quizQuestion: QuizQuestionWithContents;
  elements: SlideElementWithQuestionContentAndPoint[];
};
