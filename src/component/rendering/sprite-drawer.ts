import { Canvas } from "@display";
import { Sprite } from "@game-object/core";

import { Drawer } from "./renderer";

export default class SpriteDrawer implements Drawer {
  public draw(sprite: Sprite, canvas: Canvas): void {
    const image = sprite.texture.image;
    canvas.drawImage(
      image,
      sprite.position.x,
      sprite.position.y - image.height,
      image.width,
      image.height,
    );
  }
}
