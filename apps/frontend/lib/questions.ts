import { QuestionElementType } from '@prisma/client';
import { QuestionWithContentAndCategoriesAndMode } from 'types/api/question';

export function filterQuestions(
  data: QuestionWithContentAndCategoriesAndMode[],
  search: string
) {
  const query = search.toLowerCase().trim();
  const keys = data?.[0] ? Object.keys(data[0]) : [];
  return data?.filter((item) =>
    keys.some((key) => {
      const textualContent =
        item.contents
          ?.filter((c) => c.type === QuestionElementType.TEXT)
          .map((c) => c.content.toLowerCase()) ?? [];
      const categories =
        item.categories?.map((c) => c.name.toLowerCase()) ?? [];
      return [...textualContent, ...categories].some((c) => c.includes(query));
    })
  );
}
