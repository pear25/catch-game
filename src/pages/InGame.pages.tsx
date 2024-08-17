import { useEffect } from 'react';
import { Boat } from '../entity/Boat';

export const InGame = () => {
  const audio = new Audio('/public/audio/game-start.mp3');

  useEffect(() => {
    audio.play();
  }, []);

  return (
    <div className="boat overflow-y-hidden">
      <Boat />
    </div>
  );
};
