import { StateCreator, create } from 'zustand';

type ScoreSlice = {
  score: number;
  setScore: (newScore: number) => void;
};

const createGameSlice: StateCreator<ScoreSlice> = (set, get) => ({
  score: 0,
  setScore: (newScore: number) =>
    set(() => ({ score: get().score + newScore })),
});

export const useScoreSlice = create<ScoreSlice>(createGameSlice);
