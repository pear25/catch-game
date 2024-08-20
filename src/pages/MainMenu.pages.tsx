import { Button } from '../components/Button';
import { useGameSlice } from '../store/game.store';
import { ScreenState, useScreenSlice } from '../store/screen.store';

export const MainMenu = () => {
  const titles = ['Pirates', '&', 'Plumbers'];
  const screenSlice = useScreenSlice();
  const gameSlice = useGameSlice();
  const changeScreen = (newScreen: ScreenState) => {
    screenSlice.setScreenState(newScreen);
  };
  const playOrSeeTutorial = () => {
    if (gameSlice.hasCompletedTutorial) {
      return changeScreen(ScreenState.IN_GAME);
    }
    changeScreen(ScreenState.TUTORIAL);
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen font-jersey">
      <div className="mb-8">
        {titles.map((title, index) => (
          <h1 key={index} className="font-jersey px-10 rounded-lg">
            {title}
          </h1>
        ))}
      </div>
      <Button
        text={'Start Game'}
        onClick={playOrSeeTutorial}
        className="px-4 py-2"
      />
      <Button
        variant="secondary"
        text={'Leaderboards'}
        className="px-4 py-2"
        onClick={() => changeScreen(ScreenState.LEADERBOARD)}
      />
    </div>
  );
};
