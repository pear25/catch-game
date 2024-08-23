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
    <div className="flex gap-12 sm:gap-32 justify-between items-center w py-2 z-0 px-10 md:text-md text-sm">
      <p>{rank}</p>
      <p className="break-words max-w-[120px] sm:max-w-[200px] md:max-w-[350px] lg:max-w-fit">
        {name}
      </p>
      <p>{score}</p>
    </div>
  );
};
