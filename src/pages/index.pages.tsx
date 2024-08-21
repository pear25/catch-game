import { FullScreenLayout } from '../layouts/FullScreen.layout';
import { ScreenState, useScreenSlice } from '../store/screen.store';
import { GameOver } from './GameOver.pages';
import { InGame } from './InGame.pages';
import { Leaderboard } from './Leaderboard.pages';
import { MainMenu } from './MainMenu.pages';
import { Tutorial } from './Tutorial.pages';

export const UIView = () => {
  const { screenState } = useScreenSlice();
  const wrapInFullScreenLayout = (children: React.ReactNode) => {
    return <FullScreenLayout>{children}</FullScreenLayout>;
  };

  switch (screenState) {
    case ScreenState.MAIN_MENU:
      return wrapInFullScreenLayout(<MainMenu />);
    case ScreenState.IN_GAME:
      return wrapInFullScreenLayout(<InGame />);
    case ScreenState.GAME_OVER:
      return wrapInFullScreenLayout(<GameOver />);
    case ScreenState.LEADERBOARD:
      return wrapInFullScreenLayout(<Leaderboard />);
    case ScreenState.TUTORIAL:
      return wrapInFullScreenLayout(<Tutorial />);

    default:
      return wrapInFullScreenLayout(<MainMenu />);
  }
};
