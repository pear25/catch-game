import { useGameSlice } from '../store/game.store';

export const PauseOverlay = () => {
  const { isGamePaused } = useGameSlice();
  return (
    <>
      {isGamePaused && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-200 bg-opacity-50 z-10 font-bungee-tint">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-4xl">Paused</h1>
          </div>
        </div>
      )}
    </>
  );
};
