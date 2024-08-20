import { Button } from '../components/Button';
import {
  enemies,
  paragraphOne,
  paragraphTwo,
  pirates,
  TUTORIAL_SPRITE_SIZE,
} from '../constants/Tutorial.constants';
import { useGameSlice } from '../store/game.store';
import { ScreenState, useScreenSlice } from '../store/screen.store';

export const Tutorial = () => {
  const screenSlice = useScreenSlice();
  const gameSlice = useGameSlice();

  const handleOkTutorial = () => {
    gameSlice.setHasCompletedTutorial();
    screenSlice.setScreenState(ScreenState.IN_GAME);
  };

  return (
    <div className="flex flex-col gap-4 h-screen justify-center items-center px-8">
      <div className="bg-slate-800 bg-opacity-75 backdrop-blur-lg flex flex-col gap-4 rounded-lg overflow-scroll overflow-x-hidden h-fit scrollbar-hide items-center justify-center">
        <div className="p-4 px-8 flex flex-col gap-4">
          {paragraphOne.map((paragraph, i) => (
            <div key={`paragraph1_${i}`}>{paragraph}</div>
          ))}
          <div className="flex justify-center items-center gap-4">
            {pirates.map((pirate, i) => (
              <img
                src={pirate.img}
                alt={pirate.alt}
                key={i}
                height={TUTORIAL_SPRITE_SIZE}
                width={TUTORIAL_SPRITE_SIZE}
              />
            ))}
          </div>
          {paragraphTwo.map((paragraph, i) => (
            <div key={`paragraph2_${i}`}>{paragraph}</div>
          ))}
          <div className="flex justify-center items-center gap-4">
            {enemies.map((enemy, i) => (
              <img
                src={enemy.img}
                alt={enemy.alt}
                key={i}
                height={TUTORIAL_SPRITE_SIZE}
                width={TUTORIAL_SPRITE_SIZE}
              />
            ))}
          </div>
          <div>Good luck!</div>
          <Button text={'Start Game'} onClick={handleOkTutorial} />
        </div>
      </div>
    </div>
  );
};
