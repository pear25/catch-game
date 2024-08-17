import { useEffect } from 'react';
import { Game } from '../entity/Game';
import { Scoreboard } from './Scoreboard.pages';

export const InGame = () => {
  const audio = new Audio('/audio/game-start.mp3');

  useEffect(() => {
    // audio.play();
  }, []);

  return (
    <>
      <Game />
      <Scoreboard />
    </>
  );
};
