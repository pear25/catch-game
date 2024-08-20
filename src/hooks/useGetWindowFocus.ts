import { useEffect, useState } from 'react';

export function useGetWindowFocus() {
  const [isWindowFocused, setIsWindowFocused] = useState<boolean>(true);

  const handleVisibilityChange = () => {
    setIsWindowFocused(document.visibilityState === 'visible');
  };
  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return {
    isWindowFocused,
  };
}
