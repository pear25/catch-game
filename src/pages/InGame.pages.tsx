import { useEffect } from 'react';
import { Game } from '../components/Game';
import { Scoreboard } from '../components/Scoreboard';
import { useGameSlice } from '../store/game.store';
import { useScoreSlice } from '../store/score.store';

export const InGame = () => {
  const audio = new Audio('/audio/game-start.mp3');
  const gameSlice = useGameSlice();
  const scoreSlice = useScoreSlice();

  useEffect(() => {
    gameSlice.setGameOver(false);
    gameSlice.resetTimer();
    scoreSlice.setScore(0);
    // audio.play();
  }, []);

  return (
    <>
      <Game />
      {!gameSlice.isGameOver && <Scoreboard />}
    </>
  );
};
