import { useEffect } from 'react';
import { Game } from '../components/Game';
import { Scoreboard } from '../components/Scoreboard';
import { useGameSlice } from '../store/game.store';
import { useScoreSlice } from '../store/score.store';
import { GamePlayer } from '../components/GamePlayer';
import { PauseOverlay } from '../components/PauseOverlay';

export const InGame = () => {
  const { setGameOver, resetTimer, isGameOver } = useGameSlice();
  const { resetScore } = useScoreSlice();

  useEffect(() => {
    setGameOver(false);
    resetTimer();
    resetScore();
  }, []);

  return (
    <>
      <PauseOverlay />
      <Game />
      <GamePlayer />
      {!isGameOver && <Scoreboard />}
    </>
  );
};
