enum Sprite {
  PIRATE = 'pirate',
  ENEMY = 'enemy',
}

export const SPRITES_LIST: Record<string, Sprite> = {
  '/images/p1.png': Sprite.PIRATE,
  '/images/p2.png': Sprite.PIRATE,
  '/images/p3.png': Sprite.PIRATE,
  '/images/p4.png': Sprite.PIRATE,
  '/images/e1.png': Sprite.ENEMY,
  '/images/e2.png': Sprite.ENEMY,
};

export const SPRITES_LENGTH = Object.keys(SPRITES_LIST).length;
export const SPRITE_SPEED = 2;
export const SPRITE_WIDTH = 50;
export const SPRITE_HEIGHT = 50;
export const TOP_OF_SCREEN = 0;
