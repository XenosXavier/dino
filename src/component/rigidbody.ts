import GameObject from "../game-object/game-object";

export enum GravityMode {
  None,
  Normal,
  FastFall,
}

export default class Rigidbody {
  private readonly gravityValues: Record<GravityMode, number> = {
    [GravityMode.None]: 0,
    [GravityMode.Normal]: 2300,
    [GravityMode.FastFall]: 6500,
  };

  private gameObject: GameObject;
  public gravityMode: GravityMode;
  private velocityX: number;
  private velocityY: number;

  public constructor(
    gameObject: GameObject,
    gravityMode: GravityMode = GravityMode.Normal
  ) {
    this.gameObject = gameObject;
    this.gravityMode = gravityMode;
    this.velocityX = 0;
    this.velocityY = 0;
  }

  public setGravityMode(gravityMode: GravityMode): void {
    this.gravityMode = gravityMode;
  }

  public setVelocity(velocityX: number, velocityY: number): void {
    this.velocityX = velocityX;
    this.velocityY = velocityY;
  }

  public update(deltaTime: number): void {
    const gravity = this.gravityValues[this.gravityMode];
    this.velocityY += (gravity * deltaTime) / 1000;
    this.gameObject.x += (this.velocityX * deltaTime) / 1000;
    this.gameObject.y += (this.velocityY * deltaTime) / 1000;
  }
}
