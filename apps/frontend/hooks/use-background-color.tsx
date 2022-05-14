import create from "zustand";

interface BackgroundColor {
  backgroundColor: string;
  setBackgroundColor: (value: string) => void;
}

const useStore = create<BackgroundColor>((set) => ({
  backgroundColor: '',
  setBackgroundColor: (color) =>
    set((state) => ({ ...state, backgroundColor: color })),
}));

export const useBackgroundColor = () => {
  const backgroundColor = useStore((state) => state.backgroundColor);

  const setBackgroundColor = useStore((state) => state.setBackgroundColor);

  return {
    backgroundColor,
    setBackgroundColor,
  };
};
