import GameObject from "../game-object";

export default abstract class Sprite extends GameObject {
  public abstract get texture(): HTMLImageElement;

  public get width(): number {
    return this.texture.width;
  }

  public get height(): number {
    return this.texture.height;
  }
}
