import create from 'zustand';

import { QuestionWithContentAndOwnerAndCategoriesAndMode } from 'types/question';

type SelectedQuestion = {
  selectedQuestion: QuestionWithContentAndOwnerAndCategoriesAndMode | null;
  setSelectedQuestion: (
    role: QuestionWithContentAndOwnerAndCategoriesAndMode | null
  ) => void;
};

export const useSelectedQuestion = create<SelectedQuestion>((set) => ({
  selectedQuestion: null,
  setSelectedQuestion: (
    selectedQuestion: QuestionWithContentAndOwnerAndCategoriesAndMode
  ) => set((state) => ({ ...state, selectedQuestion })),
}));
