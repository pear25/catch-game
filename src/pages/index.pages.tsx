import { FullScreenLayout } from '../layouts/FullScreen.layout';
import { GameState, useGameSliceState } from '../store/global.store';
import { MainMenu } from './MainMenu.pages';

export const UIView = () => {
  const wrapInFullScreenLayout = (children: React.ReactNode) => {
    return <FullScreenLayout>{children}</FullScreenLayout>;
  };

  const currentView = useGameSliceState((state) => state.gameState);
  switch (currentView) {
    case GameState.MAIN_MENU:
      return wrapInFullScreenLayout(<MainMenu />);
    case GameState.IN_GAME:
      return wrapInFullScreenLayout(<div>Game</div>);
    case GameState.GAME_OVER:
      return wrapInFullScreenLayout(<div>Game Over</div>);
    case GameState.LEADERBOARD:
      return wrapInFullScreenLayout(<div>Leaderboard</div>);

    default:
      return <MainMenu />;
  }
};
