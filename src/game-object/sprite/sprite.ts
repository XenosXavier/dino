import Position from "../../component/position";
import GameObject from "../game-object";

export default abstract class Sprite extends GameObject {
  protected position: Position;

  public constructor() {
    super();
    this.addComponent((this.position = new Position()));
  }

  public set x(x: number) {
    this.position.x = x;
  }

  public set y(y: number) {
    this.position.y = y;
  }

  public get x(): number {
    return this.position.x;
  }

  public get y(): number {
    return this.position.y;
  }

  public get width(): number {
    return this.texture.width;
  }

  public get height(): number {
    return this.texture.height;
  }

  public abstract get texture(): HTMLImageElement;
}
