import GameObject from "../game-object";

export default abstract class Sprite extends GameObject {
  public get width(): number {
    return this.texture.width;
  }

  public get height(): number {
    return this.texture.height;
  }

  public abstract get texture(): HTMLImageElement;
}
