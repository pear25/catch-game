import { useUserScoreForm } from '../hooks/useScoreForm';
import { useGameSlice } from '../store/game.store';
import { ScreenState, useScreenSlice } from '../store/screen.store';

export const GameOver = () => {
  const screenSlice = useScreenSlice();
  const { register, onSubmit } = useUserScoreForm();
  const gameSlice = useGameSlice();
  const navigateTo = (screen: ScreenState) => {
    screenSlice.setScreenState(screen);
    gameSlice.setGameOver(false);
  };

  return (
    <div className="flex flex-col gap-4 h-screen justify-center items-center font-jersey">
      <div className="bg-slate-800 bg-opacity-75 backdrop-blur-lg flex flex-col gap-4 rounded-lg overflow-scroll overflow-x-hidden scrollbar-hide px-12 py-8">
        <div>GAME OVER</div>
        <div>ENTER YOUR NAME TO GET IN THE SCOREBOARD!</div>
        <div className="flex flex-col gap-4 w-full justify-center items-center">
          <input
            className="flex items-center justify-center w-3/5 rounded-lg py-2 px-4"
            {...register('name')}
          ></input>
          <div className="flex flex-row justify-between gap-4 h-1/2">
            <button className="px-4 py-2" onClick={onSubmit}>
              Submit!
            </button>
            <button
              className="px-4 py-2"
              onClick={() => navigateTo(ScreenState.MAIN_MENU)}
            >
              Go to Main Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
