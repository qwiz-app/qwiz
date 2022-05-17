import create from 'zustand';

import { Question } from '@prisma/client';

type SelectedQuestion = {
  selectedQuestion: Question | null;
  setSelectedQuestion: (role: Question | null) => void;
};

export const useSelectedQuestion = create<SelectedQuestion>((set) => ({
  selectedQuestion: null,
  setSelectedQuestion: (selectedQuestion: Question) =>
    set((state) => ({ ...state, selectedQuestion })),
}));
