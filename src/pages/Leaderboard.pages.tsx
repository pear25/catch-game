import { LeaderboardScoreEntry } from '../components/LeaderboardScoreEntry';

export const Leaderboard = () => {
  let t = Array(100).fill(0);
  return (
    <div className="flex flex-col gap-4 h-screen justify-center items-center font-jersey">
      <div className="bg-slate-800 bg-opacity-75 backdrop-blur-lg flex flex-col gap-4 rounded-lg overflow-scroll overflow-x-hidden h-4/5 scrollbar-hide">
        <div className="sticky top-0 bg-opacity-100 bg-slate-800  backdrop-blur-lg z-10">
          SCOREBOARD
        </div>
        {t.map((_, i) => {
          return (
            <LeaderboardScoreEntry
              key={i}
              rank={i + 1}
              name={`Player ${i}`}
              score={Math.floor(Math.random() * 1000)}
            />
          );
        })}
      </div>
    </div>
  );
};
