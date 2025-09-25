import GameObject from "../game-object/game-object";

type CollisionHandler = (other: Collider) => void;

export default class Collider {
  public gameObject: GameObject;
  private x: number;
  private y: number;
  private width: number;
  private height: number;
  private handler?: CollisionHandler;

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

  public setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  public setSize(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }

  public setCollisionHandler(handler: CollisionHandler): void {
    this.handler = handler;
  }

  public checkCollision(other: Collider): void {
    if (this.isCollosion(other)) {
      this.handler?.(other);
    }
  }

  private isCollosion(other: Collider): boolean {
    return !(
      this.left > other.right ||
      this.right < other.left ||
      this.top > other.bottom ||
      this.bottom < other.top
    );
  }
}
