import { FaPause, FaPlay } from 'react-icons/fa';
import { useGameSlice } from '../store/game.store';

export const GamePlayer = () => {
  const gameSlice = useGameSlice();

  const toggleGameState = () => {
    if (gameSlice.isGamePaused) {
      return gameSlice.resumeGame();
    }
    if (!gameSlice.isGamePaused) {
      return gameSlice.pauseGame();
    }
  };

  return (
    <button
      className="absolute top-0.5 right-10 p-4 bg-transparent"
      onClick={() => {
        toggleGameState();
      }}
    >
      {gameSlice.isGamePaused ? (
        <FaPlay className="fill-white" />
      ) : (
        <FaPause className="fill-white" />
      )}
    </button>
  );
};
