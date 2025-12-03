import { SpriteSource } from "@game-object/core";

export default class Texture implements SpriteSource {
  public readonly key: string;
  public readonly image: HTMLImageElement;

  public constructor(key: string, image: HTMLImageElement) {
    this.key = key;
    this.image = image;
  }

  public getTexture(): Texture {
    return this;
  }
}
