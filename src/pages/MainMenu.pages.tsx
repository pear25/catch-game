import { Button } from '../components/Button';
import { FullScreenLayout } from '../layouts/FullScreen.layout';
import { ScreenState, useScreenSlice } from '../store/screen.store';

export const MainMenu = () => {
  const screenSlice = useScreenSlice();

  const changeScreen = (newScreen: ScreenState) => {
    screenSlice.setScreenState(newScreen);
  };

  return (
    <FullScreenLayout>
      <div className="flex flex-col gap-4 justify-center items-center h-screen font-jersey">
        <div className="mb-8">
          <h1 className="font-jersey">SandboxVR Game</h1>
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
