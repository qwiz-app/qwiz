import { QuestionWithContentAndCategoriesAndMode } from 'types/api/question';

export const useQuestionContents = (
  question: QuestionWithContentAndCategoriesAndMode
) => {
  const textualContent = question.contents?.filter((c) => c.type === 'TEXT');
  const imageContent = question.contents?.filter((c) => c.type === 'IMAGE');

  const hasTextualContent = textualContent?.length > 0;
  const hasImageContent = imageContent?.length > 0;

  const primaryTextualContent = textualContent?.[0]?.content ?? 'Unknown';

  const { categories } = question;
  const hasCategories = categories?.length > 0;

  return {
    textualContent,
    imageContent,
    primaryTextualContent,
    categories,
    hasTextualContent,
    hasImageContent,
    hasCategories,
  };
};
