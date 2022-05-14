import {
  Point,
  QuestionContent,
  QuizQuestion,
  QuizSlide,
  QuizSlideElement,
} from '@prisma/client';

export type SlideElementWithQuestionContentAndPoint = QuizSlideElement & {
  point: Point;
  questionContent: QuestionContent;
};

export type SlideWithQuestionAndElements = QuizSlide & {
  question: QuizQuestion;
  elements: SlideElementWithQuestionContentAndPoint[];
};
