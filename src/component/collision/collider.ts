import { GameObject } from "@game-object/core";
import { Rect } from "@type/geometry";

export default class Collider {
  private gameObject: GameObject;
  private rect: Rect;

  public constructor(gameObject: GameObject, rect: Rect) {
    this.gameObject = gameObject;
    this.rect = rect;
  }

  public get left(): number {
    return this.gameObject.position.x + this.rect.x;
  }

  public get right(): number {
    return this.gameObject.position.x + this.rect.x + this.rect.width;
  }

  public get top(): number {
    return this.gameObject.position.y + this.rect.y - this.rect.height;
  }

  public get bottom(): number {
    return this.gameObject.position.y + this.rect.y;
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
