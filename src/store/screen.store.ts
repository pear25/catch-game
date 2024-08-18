import { StateCreator, create } from 'zustand'

type ScreenSlice = {
    screenState: ScreenState;
    setScreenState: (newScreenState: ScreenState) => void;
}


export enum ScreenState {
    MAIN_MENU = 'MAIN_MENU',
    IN_GAME = 'IN_GAME', 
    GAME_OVER = 'GAME_OVER',
    LEADERBOARD = 'LEADERBOARD',
}


const createScreenSlice: StateCreator<
ScreenSlice
> = (set) => ({
    screenState: ScreenState.MAIN_MENU,
    setScreenState: (newScreenState: ScreenState) => set(() => ({ screenState: newScreenState })),
})


export const useScreenSlice = create<ScreenSlice>(createScreenSlice)