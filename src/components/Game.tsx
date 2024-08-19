import { useEffect, useRef } from 'react';
import {
  ACCELERATION_RATE,
  BASELINE_SCREEN_WIDTH,
  BOAT_HEIGHT,
  BOAT_IMAGE,
  BOAT_WIDTH,
  BoatDirection,
  DECELERATION_RATE,
  INITIAL_POSITION,
  MAX_SPEED,
  MovementKeys,
  SCALED_Y_POSITION,
} from '../constants/Boat.constants';
import {
  SPRITES_LENGTH,
  SPRITES_LIST,
  SPRITE_HEIGHT,
  SPRITE_SPEED,
  SPRITE_WIDTH,
  Sprite,
  TOP_OF_SCREEN,
} from '../constants/Pirate.constants';
import {
  BASE_PIRATE_SPAWN_TIME,
  ENEMY_SCORE,
  MINUS_AUDIO,
  PIRATE_SCORE,
  PLUS_AUDIO,
  RANDOM_PIRATE_SPAWN_TIME,
} from '../constants/Game.constants';
import { useScoreSlice } from '../store/score.store';
import { useGameSlice } from '../store/game.store';
import { ScreenState, useScreenSlice } from '../store/screen.store';
import { useScreenWidth } from '../hooks/useGetScreenSize';

type PirateType = {
  x: number;
  y: number;
  speed: number;
  width: number;
  height: number;
  image: HTMLImageElement;
  type: Sprite.PIRATE | Sprite.ENEMY;
};

export const Game = () => {
  const scoreSlice = useScoreSlice();
  const gameSlice = useGameSlice();
  const screenSlice = useScreenSlice();

  const { screenWidth, screenScale, screenHeight } = useScreenWidth();
  const screenWidthRef = useRef(screenWidth);
  const screenScaleRef = useRef(screenScale);

  const SCALE =
    (screenWidthRef.current / BASELINE_SCREEN_WIDTH) * screenScaleRef.current;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sprites = useRef<PirateType[]>([]);
  const animationRef = useRef<number>(0);
  const loopRef = useRef<number>(0);
  const pos = useRef(INITIAL_POSITION);
  const direction = useRef(0);
  const speed = useRef(0);
  const lastPressed = useRef(BoatDirection.NONE);

  const playAudio = (audioUrl: string) => {
    const audio = new Audio(audioUrl);
    audio.play();
  };

  const initSprite = () => {
    return {
      x: Math.random() * screenWidthRef.current - SPRITE_WIDTH,
      y: TOP_OF_SCREEN,
      speed: SPRITE_SPEED * SCALE,
      width: SPRITE_WIDTH * SCALE,
      height: SPRITE_HEIGHT * SCALE,
      image: new Image(),
      type: Sprite.PIRATE,
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas && canvas.getContext('2d');
    const boatSprite = new Image();
    boatSprite.src = BOAT_IMAGE;

    if (!canvas || !context || !pos) {
      return;
    }

    const renderImage = () => {
      context.save();
      if (lastPressed.current === BoatDirection.NONE) {
        console.log(pos.current);
        context.drawImage(
          boatSprite,
          pos.current * SCALE,
          SCALED_Y_POSITION,
          BOAT_WIDTH * SCALE,
          BOAT_HEIGHT * SCALE
        );
      } else if (lastPressed.current === BoatDirection.LEFT) {
        console.log(pos.current);
        context.scale(-1, 1);
        context.drawImage(
          boatSprite,
          -pos.current * SCALE - BOAT_WIDTH * SCALE,
          SCALED_Y_POSITION,
          BOAT_WIDTH * SCALE,
          BOAT_HEIGHT * SCALE
        );
      } else {
        context.scale(1, 1);
        context.drawImage(
          boatSprite,
          pos.current * SCALE,
          SCALED_Y_POSITION,
          BOAT_WIDTH * SCALE,
          BOAT_HEIGHT * SCALE
        );
      }
      context.restore();
    };

    boatSprite.onload = () => renderImage();

    const handleStartBoatMovement = (event: KeyboardEvent) => {
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

    const handleStopBoatMovement = (event: KeyboardEvent) => {
      if (Object.values(MovementKeys).includes(event.key as MovementKeys)) {
        direction.current = BoatDirection.NONE;
      }
    };

    const gameLoop = () => {
      if (gameSlice.isGameOver) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(loopRef.current);
        cancelAnimationFrame(animationRef.current);
        return;
      }
      context.clearRect(0, 0, canvas.width, canvas.height);

      const LEFT_BOUNDARY = 0;
      const RIGHT_BOUNDARY = screenWidthRef.current - BOAT_WIDTH * SCALE;

      const isHittingLeftBoundary =
        pos.current < LEFT_BOUNDARY && direction.current === BoatDirection.LEFT;
      const isHittingRightBoundary =
        pos.current * SCALE > RIGHT_BOUNDARY &&
        direction.current === BoatDirection.RIGHT;

      if (isHittingLeftBoundary) {
        pos.current = LEFT_BOUNDARY;
        speed.current = 0;
      } else if (isHittingRightBoundary) {
        pos.current = pos.current;
        speed.current = 0;
      }

      if (direction.current !== BoatDirection.NONE) {
        if (speed.current < MAX_SPEED) {
          speed.current += ACCELERATION_RATE * SCALE;
        }
      } else {
        speed.current *= DECELERATION_RATE;
      }
      pos.current += direction.current * speed.current;

      sprites.current.forEach((sprite, i) => {
        context.drawImage(
          sprite.image,
          sprite.x,
          sprite.y,
          sprite.width,
          sprite.height
        );

        sprite.y += sprite.speed;

        const isCollidingWithBoat =
          sprite.x < pos.current * SCALE + BOAT_WIDTH * SCALE &&
          sprite.x + sprite.width > pos.current * SCALE &&
          sprite.y < SCALED_Y_POSITION + BOAT_WIDTH * SCALE &&
          sprite.y + sprite.height > SCALED_Y_POSITION;

        if (isCollidingWithBoat) {
          sprites.current.splice(i, 1);
          if (sprite.type === Sprite.PIRATE) {
            playAudio(PLUS_AUDIO);
            scoreSlice.setScore(scoreSlice.score + PIRATE_SCORE);
          }
          if (sprite.type === Sprite.ENEMY) {
            playAudio(MINUS_AUDIO);
            scoreSlice.setScore(scoreSlice.score + ENEMY_SCORE);
          }
        }

        if (sprite.y >= canvas.height) {
          sprites.current.splice(i, 1);
        }
      });

      renderImage();
      loopRef.current = requestAnimationFrame(gameLoop);
    };

    animationRef.current = requestAnimationFrame(gameLoop);

    setInterval(() => {
      const sprite = initSprite();
      const selectedSprite =
        Object.keys(SPRITES_LIST)[Math.floor(Math.random() * SPRITES_LENGTH)];
      sprite.image.src = selectedSprite;
      sprite.type = SPRITES_LIST[selectedSprite];

      sprites.current.push(sprite);
    }, Math.random() * RANDOM_PIRATE_SPAWN_TIME + BASE_PIRATE_SPAWN_TIME);

    window.addEventListener('keydown', handleStartBoatMovement);
    window.addEventListener('keyup', handleStopBoatMovement);

    return () => {
      cancelAnimationFrame(animationRef.current);
      cancelAnimationFrame(loopRef.current);
      window.removeEventListener('keydown', handleStartBoatMovement);
      window.removeEventListener('keyup', handleStopBoatMovement);
    };
  }, [gameSlice.isGameOver]);

  useEffect(() => {
    screenWidthRef.current = screenWidth;
    screenScaleRef.current = screenScale;
  }, [screenWidth]);

  useEffect(() => {
    if (gameSlice.gameTimer === 59) {
      gameSlice.setGameOver(true);
      screenSlice.setScreenState(ScreenState.GAME_OVER);
      gameSlice.resetTimer();
    }
  }, [gameSlice.gameTimer]);

  return (
    <canvas
      id={'gameCanvas'}
      ref={canvasRef}
      width={screenWidth}
      height={screenHeight}
    />
  );
};
