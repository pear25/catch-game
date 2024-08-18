import { useEffect, useRef } from 'react';
import {
  ACCELERATION_RATE,
  BOAT_HEIGHT,
  BOAT_IMAGE,
  BOAT_WIDTH,
  BoatDirection,
  DECELERATION_RATE,
  INITIAL_POSITION,
  MAX_SPEED,
  MovementKeys,
  SCREEN_WIDTH,
  Y_POSITION,
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
        context.drawImage(
          boatSprite,
          pos.current,
          Y_POSITION,
          BOAT_WIDTH,
          BOAT_HEIGHT
        );
      } else if (lastPressed.current === BoatDirection.LEFT) {
        context.scale(-1, 1);
        context.drawImage(
          boatSprite,
          -pos.current - BOAT_WIDTH,
          Y_POSITION,
          BOAT_WIDTH,
          BOAT_HEIGHT
        );
      } else {
        context.scale(1, 1);
        context.drawImage(
          boatSprite,
          pos.current,
          Y_POSITION,
          BOAT_WIDTH,
          BOAT_HEIGHT
        );
      }
      context.restore();
    };

    boatSprite.onload = () => renderImage();

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
      if (gameSlice.isGameOver) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(loopRef.current);
        cancelAnimationFrame(animationRef.current);
        return;
      }
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
          sprite.x < pos.current + BOAT_WIDTH &&
          sprite.x + sprite.width > pos.current &&
          sprite.y < Y_POSITION + BOAT_HEIGHT &&
          sprite.y + sprite.height > Y_POSITION;

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
      const sprite = {
        x: Math.random() * canvas.width - SPRITE_WIDTH,
        y: TOP_OF_SCREEN,
        speed: SPRITE_SPEED,
        width: SPRITE_WIDTH,
        height: SPRITE_HEIGHT,
        image: new Image(),
        type: Sprite.PIRATE,
      };
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
    if (gameSlice.gameTimer === 0) {
      gameSlice.setGameOver(true);
      screenSlice.setScreenState(ScreenState.GAME_OVER);
      gameSlice.resetTimer();
    }
  }, [gameSlice.gameTimer]);

  return (
    <canvas
      id={'gameCanvas'}
      ref={canvasRef}
      width={SCREEN_WIDTH}
      height={window.innerHeight}
    />
  );
};
