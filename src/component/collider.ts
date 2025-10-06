import GameObject from "../game-object/game-object";
import Component from "./component";

export default class Collider implements Component {
  private gameObject: GameObject;
  private x: number;
  private y: number;
  private width: number;
  private height: number;

  public constructor(
    gameObject: GameObject,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    this.gameObject = gameObject;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  public get left(): number {
    return this.gameObject.x + this.x;
  }

  public get right(): number {
    return this.gameObject.x + this.x + this.width;
  }

  public get top(): number {
    return this.gameObject.y + this.y - this.height;
  }

  public get bottom(): number {
    return this.gameObject.y + this.y;
  }

  public isCollision(other: Collider): boolean {
    return !(
      this.left > other.right ||
      this.right < other.left ||
      this.top > other.bottom ||
      this.bottom < other.top
    );
  }
}
