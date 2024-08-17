import { FullScreenLayout } from '../layouts/FullScreen.layout';
import { GameState, useGameSliceState } from '../store/game.store';
import { InGame } from './InGame.pages';
import { Leaderboard } from './Leaderboard.pages';
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
      return wrapInFullScreenLayout(<InGame />);
    case GameState.GAME_OVER:
      return wrapInFullScreenLayout(<div>Game Over</div>);
    case GameState.LEADERBOARD:
      return wrapInFullScreenLayout(<Leaderboard />);

    default:
      return <MainMenu />;
  }
};
