type LeaderboardScoreEntryProps = {
  name: string;
  score: number;
  rank: number;
};

export const LeaderboardScoreEntry = ({
  name,
  score,
  rank,
}: LeaderboardScoreEntryProps) => {
  return (
    <div className="flex gap-32 justify-between items-center w py-2 text-2xl z-0 px-10">
      <p>{rank}</p>
      <p>{name}</p>
      <p>{score}</p>
    </div>
  );
};
