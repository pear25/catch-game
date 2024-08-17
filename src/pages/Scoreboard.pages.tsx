import { useScoreSliceState } from '../store/score.store';

export const Scoreboard = () => {
  const scoreSlice = useScoreSliceState();
  return (
    <div className="absolute top-1 right-2 rounded-lg bg-slate-600 p-4">
      Score: {scoreSlice.score}
    </div>
  );
};
