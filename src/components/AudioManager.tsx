import { useEffect, useState } from 'react';
import { AiFillMuted, AiFillSound } from 'react-icons/ai';

export const AudioManager = () => {
  const [allowAudio, setAllowAudio] = useState(false);
  const audio = new Audio('/audio/main-menu.mp3');
  audio.loop = true;

  useEffect(() => {
    if (allowAudio) {
      audio.play();
    }
    return () => {
      audio.pause();
    };
  }, [allowAudio]);

  return (
    <button
      className="absolute top-0.5 right-1 p-4 bg-transparent"
      onClick={() => setAllowAudio((prev) => !prev)}
    >
      {allowAudio ? (
        <AiFillSound className="fill-black" />
      ) : (
        <AiFillMuted className="fill-black" />
      )}
    </button>
  );
};
