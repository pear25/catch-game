import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';

type MobileControlProps = {
  onKeyPress: (leftPressed: boolean, rightPressed: boolean) => void;
};

export const MobileControl = ({ onKeyPress }: MobileControlProps) => {
  const [leftPressed, setLeftPressed] = useState<boolean>(false);
  const [rightPressed, setRightPressed] = useState<boolean>(false);

  const handleTouchStartLeft = () => {
    setLeftPressed(true);
    onKeyPress(true, rightPressed);
  };

  const handleTouchEndLeft = () => {
    setLeftPressed(false);
    onKeyPress(false, rightPressed);
  };

  const handleTouchStartRight = () => {
    setRightPressed(true);
    onKeyPress(leftPressed, true);
  };

  const handleTouchEndRight = () => {
    setRightPressed(false);
    onKeyPress(leftPressed, false);
  };
  return (
    <>
      {isMobile && (
        <>
          <button
            className="absolute bottom-10 left-3 text-4xl select-none bg-transparent"
            onTouchStart={handleTouchStartLeft}
            onTouchEnd={handleTouchEndLeft}
          >
            <BsArrowLeftCircleFill className="select-none" />
          </button>
          <button
            onTouchStart={handleTouchStartRight}
            onTouchEnd={handleTouchEndRight}
            className="absolute bottom-10 right-3 text-4xl select-none bg-transparent"
          >
            <BsArrowRightCircleFill className="select-none" />
          </button>
        </>
      )}
    </>
  );
};
