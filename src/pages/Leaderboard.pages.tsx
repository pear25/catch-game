import { IoMdArrowRoundBack } from 'react-icons/io';
import { LeaderboardScoreEntry } from '../components/LeaderboardScoreEntry';
import { ScreenState, useScreenSlice } from '../store/screen.store';
import { useGetUserScore } from '../hooks/useGetUserScores';
import { Spinner } from '../components/Spinner';
import { Button } from '../components/Button';

export const Leaderboard = () => {
  const { data: userScores, isLoading } = useGetUserScore();
  const screenSlice = useScreenSlice();
  const backToMainMenu = () => {
    screenSlice.setScreenState(ScreenState.MAIN_MENU);
  };
  const playAgain = () => {
    screenSlice.setScreenState(ScreenState.IN_GAME);
  };

  console.log(userScores);
  return (
    <>
      <div className="flex flex-col gap-4 h-screen justify-center items-center font-jersey">
        <div className="bg-slate-800 bg-opacity-75 backdrop-blur-lg flex flex-col gap-4 rounded-lg overflow-scroll overflow-x-hidden h-4/5 scrollbar-hide min-w-[30svw]">
          <div className="sticky top-0 bg-opacity-100 bg-slate-800  backdrop-blur-lg z-10 flex flex-row justify-between px-8 py-2 text-2xl">
            <div>RANK</div>
            <div>NAME</div>
            <div>SCORE</div>
          </div>
          {isLoading ? (
            <Spinner />
          ) : (
            userScores?.users.map((user, i) => {
              return (
                <LeaderboardScoreEntry
                  key={i}
                  rank={i + 1}
                  name={user.name}
                  score={user.score}
                />
              );
            })
          )}
        </div>
        <div className="flex gap-6">
          <Button
            text={'Play again!'}
            variant="secondary"
            onClick={playAgain}
          />
          <Button text={'Main Menu'} onClick={backToMainMenu} />
        </div>
      </div>
      <div
        className="absolute top-1 left-1 p-4 text-black"
        onClick={backToMainMenu}
      >
        <IoMdArrowRoundBack />
      </div>
    </>
  );
};
