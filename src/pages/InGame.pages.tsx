import { useEffect } from 'react';
import { Game } from '../components/Game';
import { Scoreboard } from '../components/Scoreboard';
import { useGameSlice } from '../store/game.store';

export const InGame = () => {
  const audio = new Audio('/audio/game-start.mp3');
  const gameSlice = useGameSlice();

  useEffect(() => {
    gameSlice.setGameOver(false);
    // audio.play();
  }, []);

  return (
    <>
      <Game />
      {!gameSlice.isGameOver && <Scoreboard />}
    </>
  );
};
