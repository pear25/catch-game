export const DISTANCE_FROM_BOTTOM = 20;
export const BOAT_WIDTH = 144;
export const BOAT_HEIGHT = 160.5;
export const ACCELERATION_RATE = 0.038;
export const DECELERATION_RATE = 0.07;
export const MAX_SPEED = 8.5;
export const SCREEN_WIDTH = window.innerWidth;
export const BASELINE_SCREEN_WIDTH = 1520;
export const SCREEN_HEIGHT = window.innerHeight;
export const Y_POSITION = SCREEN_HEIGHT - BOAT_HEIGHT - DISTANCE_FROM_BOTTOM;
export const SCALED_DISTANCE_FROM_BOTTOM = DISTANCE_FROM_BOTTOM * 0.5;
export const SCALED_Y_POSITION =
  SCREEN_HEIGHT - BOAT_HEIGHT - SCALED_DISTANCE_FROM_BOTTOM;
export const INITIAL_POSITION = (SCREEN_WIDTH - BOAT_WIDTH) / 2;
export const BOAT_IMAGE = '/images/boat.png';

export enum MovementKeys {
  ARROW_LEFT = 'ArrowLeft',
  ARROW_RIGHT = 'ArrowRight',
  KEY_A = 'a',
  KEY_D = 'D',
  CAPS_KEY_A = 'A',
  CAPS_KEY_D = 'd',
}

export enum BoatDirection {
  LEFT = -1,
  RIGHT = 1,
  NONE = 0,
}
