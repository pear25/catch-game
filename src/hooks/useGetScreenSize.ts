import { useState, useEffect } from 'react';

const XL_SCREEN_THRESHOLD: number = 1280;
const LG_SCREEN_THRESHOLD: number = 1020;
const MD_SCREEN_THRESHOLD: number = 768;
const SM_SCREEN_THRESHOLD: number = 640;

const getScreenScale = (screenWidth: number) => {
  if (screenWidth >= XL_SCREEN_THRESHOLD) {
    return 1;
  } else if (screenWidth >= LG_SCREEN_THRESHOLD) {
    return 1.15;
  } else if (screenWidth >= MD_SCREEN_THRESHOLD) {
    return 1.25;
  } else if (screenWidth >= SM_SCREEN_THRESHOLD) {
    return 1.5;
  } else {
    return 1.8;
  }
};

export function useScreenWidth() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    screenWidth: screenWidth,
    screenHeight: screenHeight,
    screenScale: getScreenScale(screenWidth),
  };
}
