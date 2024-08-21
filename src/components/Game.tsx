import { useEffect, useRef } from 'react';
import {
  BASELINE_SCREEN_WIDTH,
  BOAT_IMAGE,
  BoatDirection,
  DECELERATION_RATE,
  INITIAL_POSITION,
} from '../constants/Boat.constants';
import { Sprite } from '../constants/Pirate.constants';
import {
  BASE_PIRATE_SPAWN_TIME,
  RANDOM_PIRATE_SPAWN_TIME,
} from '../constants/Game.constants';
import { useScoreSlice } from '../store/score.store';
import { useGameSlice } from '../store/game.store';
import { ScreenState, useScreenSlice } from '../store/screen.store';
import { useScreenWidth } from '../hooks/useGetScreenSize';
import { MobileControl } from './MobileControl';
import { gameOver, renderBoatImage } from '../utils/Game.utils';
import {
  handleBoatAcceleration,
  handleBoatCollisionLogic,
  handleStartBoatMovement,
  handleStopBoatMovement,
} from '../utils/Boat.utils';
import {
  addSpriteToCanvas,
  drawSprite,
  handleCollision,
  spriteOutOfBounds,
} from '../utils/Sprite.utils';

export type PirateType = {
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

  const canvas = canvasRef.current;
  const context = canvas && canvas.getContext('2d');
  const boatSprite = new Image();
  boatSprite.src = BOAT_IMAGE;

  const handleKeyPress = (left: boolean, right: boolean) => {
    if (left) {
      direction.current = BoatDirection.LEFT;
      lastPressed.current = BoatDirection.LEFT;
    } else if (right) {
      direction.current = BoatDirection.RIGHT;
      lastPressed.current = BoatDirection.RIGHT;
    } else {
      direction.current = BoatDirection.NONE;
      speed.current *= DECELERATION_RATE;
    }
  };

  const gameLoop = () => {
    if (!canvas || !context) return;
    if (gameSlice.isGameOver) {
      gameOver(context, canvas, loopRef, animationRef);
    }

    context.clearRect(0, 0, canvas.width, canvas.height);

    handleBoatCollisionLogic(pos, direction, speed, screenWidthRef, SCALE);
    handleBoatAcceleration(pos, direction, speed, SCALE);
    renderBoatImage(context, lastPressed, boatSprite, pos, SCALE);

    sprites.current.forEach((sprite, i) => {
      drawSprite(context, sprite);
      handleCollision(sprites, pos, sprite, i, SCALE, scoreSlice);
      spriteOutOfBounds(sprites, sprite, canvas, i);
      sprite.y += sprite.speed;
    });

    loopRef.current = requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    if (!canvas || !context || !pos) {
      return;
    }
    animationRef.current = requestAnimationFrame(gameLoop);

    window.addEventListener('keydown', (event) => {
      handleStartBoatMovement(event, direction, lastPressed);
    });
    window.addEventListener('keyup', (event) => {
      handleStopBoatMovement(event, direction);
    });

    return () => {
      cancelAnimationFrame(animationRef.current);
      cancelAnimationFrame(loopRef.current);
      window.removeEventListener('keydown', (event) => {
        handleStartBoatMovement(event, direction, lastPressed);
      });
      window.removeEventListener('keyup', (event) => {
        handleStopBoatMovement(event, direction);
      });
    };
  }, [gameSlice.isGameOver]);

  useEffect(() => {
    let spriteSpawner: number;
    if (!gameSlice.isGamePaused) {
      spriteSpawner = setInterval(() => {
        addSpriteToCanvas(screenWidthRef, SCALE, sprites);
      }, Math.random() * RANDOM_PIRATE_SPAWN_TIME + BASE_PIRATE_SPAWN_TIME);
    }

    return () => clearInterval(spriteSpawner);
  }, [gameSlice.isGamePaused]);

  useEffect(() => {
    screenWidthRef.current = screenWidth;
    screenScaleRef.current = screenScale;
  }, [screenWidth]);

  useEffect(() => {
    if (gameSlice.gameTimer === 0) {
      gameSlice.setGameOver(true);
      screenSlice.setScreenState(ScreenState.GAME_OVER);
      gameSlice.resetTimer();
    }
  }, [gameSlice.gameTimer]);

  useEffect(() => {
    if (gameSlice.isGamePaused) {
      cancelAnimationFrame(loopRef.current);
      cancelAnimationFrame(animationRef.current);
      return;
    }
    if (!gameSlice.isGamePaused) {
      animationRef.current = requestAnimationFrame(gameLoop);
      return;
    }
  }, [gameSlice.isGamePaused]);

  return (
    <>
      <canvas
        id={'gameCanvas'}
        ref={canvasRef}
        width={screenWidth}
        height={screenHeight}
      />
      <MobileControl onKeyPress={handleKeyPress} />
    </>
  );
};
