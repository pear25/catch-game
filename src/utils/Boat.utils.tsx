import { MutableRefObject } from 'react';
import {
  ACCELERATION_RATE,
  BOAT_WIDTH,
  BoatDirection,
  DECELERATION_RATE,
  MAX_SPEED,
  MovementKeys,
} from '../constants/Boat.constants';
import { Boundary } from './Game.utils';

export const LEFT_BOUNDARY = 0;
export const RIGHT_BOUNDARY = (
  screenWidthRef: MutableRefObject<number>,
  scale: number
) => screenWidthRef.current - BOAT_WIDTH * scale;

export const isHittingLeftBoundary = (
  pos: MutableRefObject<number>,
  direction: MutableRefObject<BoatDirection>
) => pos.current < LEFT_BOUNDARY && direction.current === BoatDirection.LEFT;

export const isHittingRightBoundary = (
  pos: MutableRefObject<number>,
  direction: MutableRefObject<BoatDirection>,
  screenWidthRef: MutableRefObject<number>,
  scale: number
) =>
  pos.current * scale > RIGHT_BOUNDARY(screenWidthRef, scale) &&
  direction.current === BoatDirection.RIGHT;

export const parkAtBoundary = (
  pos: MutableRefObject<number>,
  speed: MutableRefObject<number>,
  boundary: Boundary.LEFT | Boundary.RIGHT
) => {
  if (boundary === Boundary.LEFT) {
    pos.current = LEFT_BOUNDARY;
  }
  speed.current = 0;
};

export const handleStartBoatMovement = (
  event: KeyboardEvent,
  direction: MutableRefObject<BoatDirection>,
  lastPressed: MutableRefObject<BoatDirection>
) => {
  const leftKeys = [
    MovementKeys.ARROW_LEFT,
    MovementKeys.KEY_A,
    MovementKeys.CAPS_KEY_A,
  ];
  const rightKeys = [
    MovementKeys.ARROW_RIGHT,
    MovementKeys.KEY_D,
    MovementKeys.CAPS_KEY_D,
  ];

  if (leftKeys.includes(event.key as MovementKeys)) {
    direction.current = BoatDirection.LEFT;
    lastPressed.current = BoatDirection.LEFT;
  } else if (rightKeys.includes(event.key as MovementKeys)) {
    direction.current = BoatDirection.RIGHT;
    lastPressed.current = BoatDirection.RIGHT;
  }
};

export const handleStopBoatMovement = (
  event: KeyboardEvent,
  direction: MutableRefObject<BoatDirection>
) => {
  if (Object.values(MovementKeys).includes(event.key as MovementKeys)) {
    direction.current = BoatDirection.NONE;
  }
};

export const handleBoatCollisionLogic = (
  pos: MutableRefObject<number>,
  direction: MutableRefObject<BoatDirection>,
  speed: MutableRefObject<number>,
  screenWidthRef: MutableRefObject<number>,
  scale: number
) => {
  if (isHittingLeftBoundary(pos, direction)) {
    parkAtBoundary(pos, speed, Boundary.LEFT);
  } else if (isHittingRightBoundary(pos, direction, screenWidthRef, scale)) {
    parkAtBoundary(pos, speed, Boundary.RIGHT);
  }
};

export const handleBoatAcceleration = (
  pos: MutableRefObject<number>,
  direction: MutableRefObject<BoatDirection>,
  speed: MutableRefObject<number>,
  scale: number
) => {
  if (direction.current !== BoatDirection.NONE) {
    if (speed.current < MAX_SPEED) {
      speed.current += ACCELERATION_RATE * scale;
    }
  } else {
    speed.current *= DECELERATION_RATE;
  }
  pos.current += direction.current * speed.current;
};
