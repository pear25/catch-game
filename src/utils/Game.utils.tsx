import { MutableRefObject } from 'react';
import {
  BOAT_HEIGHT,
  BOAT_WIDTH,
  BoatDirection,
  SCALED_Y_POSITION,
} from '../constants/Boat.constants';
import {
  Sprite,
  SPRITE_HEIGHT,
  SPRITE_SPEED,
  SPRITE_WIDTH,
  TOP_OF_SCREEN,
} from '../constants/Pirate.constants';

export enum Boundary {
  LEFT = 'left',
  RIGHT = 'right',
}

export const playAudio = (audioUrl: string) => {
  const audio = new Audio(audioUrl);
  audio.play();
};

export const renderBoatImage = (
  context: CanvasRenderingContext2D,
  lastPressed: MutableRefObject<BoatDirection>,
  boatSprite: HTMLImageElement,
  pos: MutableRefObject<number>,
  scale: number
) => {
  if (!context) {
    return;
  }
  context.save();
  if (lastPressed.current === BoatDirection.NONE) {
    context.drawImage(
      boatSprite,
      pos.current * scale,
      SCALED_Y_POSITION,
      BOAT_WIDTH * scale,
      BOAT_HEIGHT * scale
    );
  } else if (lastPressed.current === BoatDirection.LEFT) {
    context.scale(-1, 1);
    context.drawImage(
      boatSprite,
      -pos.current * scale - BOAT_WIDTH * scale,
      SCALED_Y_POSITION,
      BOAT_WIDTH * scale,
      BOAT_HEIGHT * scale
    );
  } else {
    context.scale(1, 1);
    context.drawImage(
      boatSprite,
      pos.current * scale,
      SCALED_Y_POSITION,
      BOAT_WIDTH * scale,
      BOAT_HEIGHT * scale
    );
  }
  context.restore();
};

export const initSprite = (
  screenWidthRef: MutableRefObject<number>,
  scale: number
) => {
  return {
    x: Math.random() * screenWidthRef.current - SPRITE_WIDTH,
    y: TOP_OF_SCREEN,
    speed: SPRITE_SPEED * scale,
    width: SPRITE_WIDTH * scale,
    height: SPRITE_HEIGHT * scale,
    image: new Image(),
    type: Sprite.PIRATE,
  };
};

export const gameOver = (
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  loopRef: MutableRefObject<number>,
  animationRef: MutableRefObject<number>
) => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  cancelAnimationFrame(loopRef.current);
  cancelAnimationFrame(animationRef.current);
  return;
};
