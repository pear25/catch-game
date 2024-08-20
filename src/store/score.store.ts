import { StateCreator, create } from 'zustand';

export type ScoreSlice = {
  score: number;
  setScore: (newScore: number) => void;
  resetScore: () => void;
};

const createGameSlice: StateCreator<ScoreSlice> = (set, get) => ({
  score: 0,
  resetScore: () => set({ score: 0 }),
  setScore: (newScore: number) =>
    set(() => ({ score: get().score + newScore })),
});

export const useScoreSlice = create<ScoreSlice>(createGameSlice);
