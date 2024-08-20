import { useEffect } from 'react';
import { Game } from '../components/Game';
import { Scoreboard } from '../components/Scoreboard';
import { useGameSlice } from '../store/game.store';
import { useScoreSlice } from '../store/score.store';
import { GamePlayer } from '../components/GamePlayer';

export const InGame = () => {
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
      <GamePlayer />
      {!gameSlice.isGameOver && <Scoreboard />}
    </>
  );
};
