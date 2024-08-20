import { useEffect } from 'react';
import { useGameSlice } from '../store/game.store';
import { useScoreSlice } from '../store/score.store';

export const Scoreboard = () => {
  const { score } = useScoreSlice();
  const { isGameOver, isGamePaused, minusOneSecond, gameTimer } =
    useGameSlice();

  useEffect(() => {
    let timer: number;
    if (!isGameOver && !isGamePaused) {
      timer = setInterval(() => {
        minusOneSecond();
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isGameOver, isGamePaused]);

  return (
    <div className="absolute top-1 left-2 rounded-lg bg-emerald-700 flex gap-4 p-4 backdrop-blur-md opacity-90">
      <div>Score: {score}</div>
      <div>Time: {gameTimer}</div>
    </div>
  );
};
