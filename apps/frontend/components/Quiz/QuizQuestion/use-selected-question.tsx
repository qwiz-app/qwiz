import { QuestionWithContentAndCategoriesAndMode } from 'types/api/question';
import create from 'zustand';

type SelectedQuestion = {
  selectedQuestion: QuestionWithContentAndCategoriesAndMode | null;
  setSelectedQuestion: (
    role: QuestionWithContentAndCategoriesAndMode | null
  ) => void;
};

export const useSelectedQuestion = create<SelectedQuestion>((set) => ({
  selectedQuestion: null,
  setSelectedQuestion: (
    selectedQuestion: QuestionWithContentAndCategoriesAndMode
  ) => set((state) => ({ ...state, selectedQuestion })),
}));
