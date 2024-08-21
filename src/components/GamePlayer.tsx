import { FaPause, FaPlay } from 'react-icons/fa';
import { useGameSlice } from '../store/game.store';

export const GamePlayer = () => {
  const { isGamePaused, resumeGame, pauseGame } = useGameSlice();

  const toggleGameState = () => {
    if (isGamePaused) {
      return resumeGame();
    }
    if (!isGamePaused) {
      return pauseGame();
    }
  };

  return (
    <button
      className="absolute top-0.5 right-10 p-4 bg-transparent z-50"
      onClick={() => {
        toggleGameState();
      }}
    >
      {isGamePaused ? (
        <FaPlay className="fill-white" />
      ) : (
        <FaPause className="fill-white" />
      )}
    </button>
  );
};
