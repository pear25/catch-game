import { useEffect, useRef } from 'react';
import {
  ACCELERATION_RATE,
  BOAT_HEIGHT,
  BOAT_WIDTH,
  BoatDirection,
  DECELERATION_RATE,
  INITIAL_POSITION,
  MAX_SPEED,
  MovementKeys,
  SCREEN_WIDTH,
  Y_POSITION,
} from './Boat.constants';

export const Boat = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pos = useRef(INITIAL_POSITION);
  const direction = useRef(0);
  const speed = useRef(0);
  const lastPressed = useRef(BoatDirection.NONE);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas && canvas.getContext('2d');
    const img = new Image();
    img.src = '/public/images/boat.png';

    if (!canvas || !context || !pos) {
      return;
    }

    const renderImage = () => {
      context.save();
      if (lastPressed.current === BoatDirection.NONE) {
        context.drawImage(
          img,
          pos.current,
          Y_POSITION,
          BOAT_WIDTH,
          BOAT_HEIGHT
        );
      }
      if (lastPressed.current === BoatDirection.LEFT) {
        context.scale(-1, 1);
        context.drawImage(
          img,
          -pos.current - BOAT_WIDTH,
          Y_POSITION,
          BOAT_WIDTH,
          BOAT_HEIGHT
        );
      } else if (lastPressed.current === BoatDirection.RIGHT) {
        context.scale(1, 1);
        context.drawImage(
          img,
          pos.current,
          Y_POSITION,
          BOAT_WIDTH,
          BOAT_HEIGHT
        );
      }
      context.restore();
    };

    img.onload = () => {
      renderImage();
    };

    const handleStartBoatMovement = (event: KeyboardEvent) => {
      switch (event.key) {
        case MovementKeys.ARROW_LEFT:
          direction.current = BoatDirection.LEFT;
          lastPressed.current = BoatDirection.LEFT;
          break;
        case MovementKeys.ARROW_RIGHT:
          direction.current = BoatDirection.RIGHT;
          lastPressed.current = BoatDirection.RIGHT;
          break;
        default:
          break;
      }
    };

    const handleStopBoatMovement = (event: KeyboardEvent) => {
      if (Object.values(MovementKeys).includes(event.key as MovementKeys)) {
        direction.current = BoatDirection.NONE;
      }
    };

    const gameLoop = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      const LEFT_BOUNDARY = 0;
      const RIGHT_BOUNDARY = canvas.width - BOAT_WIDTH;

      const isHittingLeftBoundary =
        pos.current < LEFT_BOUNDARY && direction.current === BoatDirection.LEFT;
      const isHittingRightBoundary =
        pos.current > RIGHT_BOUNDARY &&
        direction.current === BoatDirection.RIGHT;

      if (isHittingLeftBoundary) {
        pos.current = LEFT_BOUNDARY;
        speed.current = 0;
      } else if (isHittingRightBoundary) {
        pos.current = RIGHT_BOUNDARY;
        speed.current = 0;
      }

      if (direction.current !== BoatDirection.NONE) {
        if (speed.current < MAX_SPEED) {
          speed.current += ACCELERATION_RATE;
        }
      } else {
        speed.current *= DECELERATION_RATE;
      }
      pos.current += direction.current * speed.current;

      renderImage();
      requestAnimationFrame(gameLoop);
    };

    window.addEventListener('keydown', handleStartBoatMovement);
    window.addEventListener('keyup', handleStopBoatMovement);
    requestAnimationFrame(gameLoop);
    return () => {
      window.removeEventListener('keydown', handleStartBoatMovement);
      window.removeEventListener('keyup', handleStopBoatMovement);
    };
  }, []);

  return (
    <canvas ref={canvasRef} width={SCREEN_WIDTH} height={window.innerHeight} />
  );
};
