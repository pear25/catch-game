import { StateCreator, create } from 'zustand';

type GameSlice = {
  gameTimer: number;
  minusOneSecond: () => void;
  isGameOver: boolean;
  setGameOver: (isGameOver: boolean) => void;
  resetTimer: () => void;
  hasCompletedTutorial: boolean;
  setHasCompletedTutorial: () => void;
};

const createGameSlice: StateCreator<GameSlice> = (set, get) => ({
  gameTimer: 60,
  minusOneSecond: () => {
    set(() => ({ gameTimer: get().gameTimer - 1 }));
  },
  isGameOver: true,
  setGameOver: (isGameOver: boolean) => {
    set(() => ({ isGameOver: isGameOver }));
  },
  resetTimer: () => {
    set(() => ({ gameTimer: 60 }));
  },
  hasCompletedTutorial: false,
  setHasCompletedTutorial: () => {
    set(() => ({ hasCompletedTutorial: true }));
  },
});

export const useGameSlice = create<GameSlice>(createGameSlice);
