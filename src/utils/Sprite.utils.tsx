import { MutableRefObject } from 'react';
import { PirateType } from '../components/Game';
import { initSprite, playAudio } from './Game.utils';
import {
  ENEMY_SCORE,
  MINUS_AUDIO,
  PIRATE_SCORE,
  PLUS_AUDIO,
} from '../constants/Game.constants';
import { BOAT_WIDTH, SCALED_Y_POSITION } from '../constants/Boat.constants';
import {
  Sprite,
  SPRITES_LENGTH,
  SPRITES_LIST,
} from '../constants/Pirate.constants';
import { ScoreSlice } from '../store/score.store';

export const handleCollision = (
  sprites: MutableRefObject<PirateType[]>,
  pos: MutableRefObject<number>,
  sprite: PirateType,
  i: number,
  scale: number,
  scoreSlice: ScoreSlice
) => {
  const isCollidingWithBoat =
    sprite.x < pos.current * scale + BOAT_WIDTH * scale &&
    sprite.x + sprite.width > pos.current * scale &&
    sprite.y < SCALED_Y_POSITION + BOAT_WIDTH * scale &&
    sprite.y + sprite.height > SCALED_Y_POSITION;

  if (isCollidingWithBoat) {
    sprites.current.splice(i, 1);
    if (sprite.type === Sprite.PIRATE) {
      playAudio(PLUS_AUDIO);
      scoreSlice.addScore(PIRATE_SCORE);
    }
    if (sprite.type === Sprite.ENEMY) {
      playAudio(MINUS_AUDIO);
      scoreSlice.addScore(ENEMY_SCORE);
    }
  }
};

export const drawSprite = (
  context: CanvasRenderingContext2D,
  sprite: PirateType
) => {
  context.drawImage(
    sprite.image,
    sprite.x,
    sprite.y,
    sprite.width,
    sprite.height
  );
};

export const spriteOutOfBounds = (
  sprites: MutableRefObject<PirateType[]>,
  sprite: PirateType,
  canvas: HTMLCanvasElement,
  i: number
) => {
  if (sprite.y >= canvas.height) {
    sprites.current.splice(i, 1);
  }
};

export const addSpriteToCanvas = (
  screenWidthRef: MutableRefObject<number>,
  scale: number,
  sprites: MutableRefObject<PirateType[]>
) => {
  const sprite = initSprite(screenWidthRef, scale);
  const selectedSprite =
    Object.keys(SPRITES_LIST)[Math.floor(Math.random() * SPRITES_LENGTH)];
  sprite.image.src = selectedSprite;
  sprite.type = SPRITES_LIST[selectedSprite];

  sprites.current.push(sprite);
};
