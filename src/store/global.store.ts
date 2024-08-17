import { StateCreator, create } from 'zustand'

type GameSlice = {
    gameState: GameState;
    setGameState: (newGameState: GameState) => void;
}


export enum GameState {
    MAIN_MENU = 'MAIN_MENU',
    IN_GAME = 'IN_GAME', 
    GAME_OVER = 'GAME_OVER',
    LEADERBOARD = 'LEADERBOARD',
}


const createGameSlice: StateCreator<
    GameSlice
> = (set) => ({
    gameState: GameState.MAIN_MENU,
    setGameState: (newGameState: GameState) => set(() => ({ gameState: newGameState })),
})


export const useGameSliceState = create<GameSlice>(createGameSlice)