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

  const headerFields = ['RANK', 'NAME', 'SCORE'];

  console.log(userScores);
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="flex flex-col gap-4 h-screen justify-center items-center px-8 md:text-md text-xs font-new-amsterdam">
            <div className="bg-slate-800 bg-opacity-75 backdrop-blur-lg flex flex-col gap-4 rounded-lg overflow-scroll overflow-x-hidden h-4/5 scrollbar-hide">
              <div className="sticky top-0 bg-opacity-100 bg-slate-800  backdrop-blur-lg z-10 flex flex-row justify-between px-8 py-2 text-2xl">
                {headerFields.map((title, index) => (
                  <div
                    key={index}
                    className="md:text-md text-xs flex justify-center items-center"
                  >
                    {title}
                  </div>
                ))}
              </div>
              {userScores?.users.map((user, i) => {
                return (
                  <LeaderboardScoreEntry
                    key={i}
                    rank={i + 1}
                    name={user.name}
                    score={user.score}
                  />
                );
              })}
            </div>
            <div className="flex gap-6 font-bungee-tint">
              <Button
                text={'Play again!'}
                variant="secondary"
                onClick={playAgain}
              />
              <Button text={'Main Menu'} onClick={backToMainMenu} />
            </div>
          </div>
          <div className="absolute top-1 left-1 p-4" onClick={backToMainMenu}>
            <IoMdArrowRoundBack />
          </div>
        </>
      )}
    </>
  );
};
