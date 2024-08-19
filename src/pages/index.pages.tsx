import { FullScreenLayout } from '../layouts/FullScreen.layout';
import { ScreenState, useScreenSlice } from '../store/screen.store';
import { GameOver } from './GameOver.pages';
import { InGame } from './InGame.pages';
import { Leaderboard } from './Leaderboard.pages';
import { MainMenu } from './MainMenu.pages';

export const UIView = () => {
  const wrapInFullScreenLayout = (children: React.ReactNode) => {
    return <FullScreenLayout>{children}</FullScreenLayout>;
  };

  const currentView = useScreenSlice((state) => state.screenState);
  switch (currentView) {
    case ScreenState.MAIN_MENU:
      return wrapInFullScreenLayout(<MainMenu />);
    case ScreenState.IN_GAME:
      return wrapInFullScreenLayout(<InGame />);
    case ScreenState.GAME_OVER:
      return wrapInFullScreenLayout(<GameOver />);
    case ScreenState.LEADERBOARD:
      return wrapInFullScreenLayout(<Leaderboard />);

    default:
      return wrapInFullScreenLayout(<MainMenu />);
  }
};
