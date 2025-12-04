import { Component } from "@component/core";
import { GameObject } from "@game-object/core";
import { Vector2 } from "@module/math";

export enum GravityMode {
  None = "none",
  Normal = "normal",
  FastFall = "fastfall",
}

const GRAVITY_VALES: Record<GravityMode, number> = {
  [GravityMode.None]: 0,
  [GravityMode.Normal]: 2300,
  [GravityMode.FastFall]: 6500,
};

export default class Rigidbody extends Component {
  public readonly velocity: Vector2;
  public gravityMode: GravityMode;

  public constructor(gameObject: GameObject) {
    super(gameObject);
    this.velocity = new Vector2();
    this.gravityMode = GravityMode.None;
  }

  public update(deltaTime: number): void {
    const gravity = GRAVITY_VALES[this.gravityMode];
    this.velocity.y += (gravity * deltaTime) / 1000;
    this.gameObject.position.x += (this.velocity.x * deltaTime) / 1000;
    this.gameObject.position.y += (this.velocity.y * deltaTime) / 1000;
  }
}
