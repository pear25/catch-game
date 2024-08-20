import { useEffect, useState } from 'react';
import { PiSpeakerHighFill, PiSpeakerSimpleXFill } from 'react-icons/pi';

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
      className="absolute top-0.5 right-1 p-4 bg-transparent z-50"
      onClick={() => setAllowAudio((prev) => !prev)}
    >
      {allowAudio ? (
        <PiSpeakerHighFill className="fill-white" />
      ) : (
        <PiSpeakerSimpleXFill className="fill-white" />
      )}
    </button>
  );
};
