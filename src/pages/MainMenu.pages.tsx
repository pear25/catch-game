import { FullScreenLayout } from '../layouts/FullScreen.layout';
import { GameState, useGameSliceState } from '../store/global.store';

export const MainMenu = () => {
  const gameSlice = useGameSliceState();

  return (
    <FullScreenLayout>
      <div className="flex flex-col gap-4 justify-center items-center h-screen font-jersey">
        <div className="mb-8">
          <h1 className="font-jersey">SandboxVR Game</h1>
        </div>
        <button
          className="p-3 px-4 rounded-lg"
          onClick={() => gameSlice.setGameState(GameState.IN_GAME)}
        >
          Start Game
        </button>
        <button className="p-3 px-4 rounded-lg">Leaderboard</button>
        <button onClick={() => gameSlice.setGameState(GameState.IN_GAME)}>
          Change game state
        </button>
      </div>
    </FullScreenLayout>
  );
};
