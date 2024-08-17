import { useEffect, useState } from 'react';
import { FullScreenLayout } from '../layouts/FullScreen.layout';
import { GameState, useGameSliceState } from '../store/global.store';

export const MainMenu = () => {
  const gameSlice = useGameSliceState();
  const [allowAudio, setAllowAudio] = useState(false);
  const audio = new Audio('/public/audio/main-menu.mp3');

  useEffect(() => {
    if (allowAudio) {
      audio.play();
    }
  }, [allowAudio]);

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
        <button
          className="p-3 px-4 rounded-lg"
          onClick={() => gameSlice.setGameState(GameState.LEADERBOARD)}
        >
          Leaderboard
        </button>
        <button onClick={() => gameSlice.setGameState(GameState.IN_GAME)}>
          Change game state
        </button>
        <button
          className="absolute top-0.5 right-1 p-4"
          onClick={() => setAllowAudio((prev) => !prev)}
        >
          Allow audio
        </button>
      </div>
    </FullScreenLayout>
  );
};
