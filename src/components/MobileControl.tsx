import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';

export const MobileControl = ({ onKeyPress }) => {
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
      {!isMobile && (
        <>
          <div
            className="absolute bottom-10 left-3 text-4xl"
            onTouchStart={handleTouchStartLeft}
            onTouchEnd={handleTouchEndLeft}
          >
            <BsArrowLeftCircleFill />
          </div>
          <div
            onTouchStart={handleTouchStartRight}
            onTouchEnd={handleTouchEndRight}
            className="absolute bottom-10 right-3 text-4xl"
          >
            <BsArrowRightCircleFill />
          </div>
        </>
      )}
    </>
  );
};
