import { FullScreenLayout } from '../layouts/FullScreen.layout';
import { ScreenState, useScreenSlice } from '../store/screen.store';

export const MainMenu = () => {
  const screenState = useScreenSlice();

  return (
    <FullScreenLayout>
      <div className="flex flex-col gap-4 justify-center items-center h-screen font-jersey">
        <div className="mb-8">
          <h1 className="font-jersey">SandboxVR Game</h1>
        </div>
        <button
          className="p-3 px-4 rounded-lg"
          onClick={() => screenState.setScreenState(ScreenState.IN_GAME)}
        >
          Start Game
        </button>
        <button
          className="p-3 px-4 rounded-lg"
          onClick={() => screenState.setScreenState(ScreenState.LEADERBOARD)}
        >
          Leaderboard
        </button>
      </div>
    </FullScreenLayout>
  );
};
