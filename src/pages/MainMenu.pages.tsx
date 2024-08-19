import { Button } from '../components/Button';
import { FullScreenLayout } from '../layouts/FullScreen.layout';
import { ScreenState, useScreenSlice } from '../store/screen.store';

export const MainMenu = () => {
  const titles = ['Pirates', '&', 'Plumbers'];
  const screenSlice = useScreenSlice();

  const changeScreen = (newScreen: ScreenState) => {
    screenSlice.setScreenState(newScreen);
  };

  return (
    <FullScreenLayout>
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
          onClick={() => changeScreen(ScreenState.IN_GAME)}
        />
        <Button
          variant="secondary"
          text={'Leaderboards'}
          onClick={() => changeScreen(ScreenState.LEADERBOARD)}
        />
      </div>
    </FullScreenLayout>
  );
};
