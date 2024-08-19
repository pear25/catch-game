import { useEffect } from 'react';
import { useGameSlice } from '../store/game.store';
import { useScoreSlice } from '../store/score.store';

export const Scoreboard = () => {
  const scoreSlice = useScoreSlice();
  const gameSlice = useGameSlice();

  useEffect(() => {
    const timer = setInterval(() => {
      if (gameSlice.isGameOver) {
        clearInterval(timer);
      }
      gameSlice.minusOneSecond();
    }, 1000);
    return () => clearInterval(timer);
  });

  return (
    <div className="absolute top-1 left-2 rounded-lg bg-slate-600 p-4 backdrop-blur-md opacity-45">
      Score: {scoreSlice.score} Time: {gameSlice.gameTimer}
    </div>
  );
};
