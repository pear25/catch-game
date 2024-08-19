import { Button } from '../components/Button';
import { useUserScoreForm } from '../hooks/useScoreForm';
import { ScreenState, useScreenSlice } from '../store/screen.store';

export const GameOver = () => {
  const screenSlice = useScreenSlice();
  const { register, onSubmit, isLoadingPost, errors } = useUserScoreForm();
  const navigateTo = (screen: ScreenState) => {
    screenSlice.setScreenState(screen);
  };

  return (
    <div className="flex flex-col gap-4 h-screen justify-center items-center font-jersey px-8">
      <div className="bg-slate-800 bg-opacity-75 backdrop-blur-lg flex flex-col gap-4 rounded-lg overflow-scroll overflow-x-hidden scrollbar-hide px-12 py-8 sm:text-xl text-header2xs">
        <div>GAME OVER</div>
        <div>
          {isLoadingPost
            ? 'ENTERING YOUR NAME...'
            : 'ENTER YOUR NAME TO GET IN THE SCOREBOARD!'}
        </div>
        <div className="flex flex-col gap-4 w-full justify-center items-center">
          <input
            className="flex items-center justify-center xs:w-3/5 rounded-lg py-2 px-4"
            {...register('name', {
              required: true,
            })}
          ></input>
          <span className="text-red-800">
            {errors.name && 'Name is required!'}
          </span>
          <div className="flex flex-row justify-between gap-4 h-1/2">
            <Button
              className={`sm:text-lg xs:text-md text-3xs`}
              onClick={onSubmit}
              text="Submit!"
              variant="secondary"
            />
            <Button
              className={`sm:text-lg xs:text-md text-3xs`}
              onClick={() => navigateTo(ScreenState.MAIN_MENU)}
              text="Go to Main Menu"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
