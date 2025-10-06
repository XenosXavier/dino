import GameObject from "../game-object/game-object";
import { Rect } from "../types/geometry";
import Collider from "./collider";
import { CollisionSource } from "./collision-body";

export default class ImageCollisionSource implements CollisionSource {
  private image: HTMLImageElement;
  private hitboxes: Rect[];

  public constructor(image: HTMLImageElement, hitboxes: Rect[] = []) {
    this.image = image;
    this.hitboxes = hitboxes;
  }

  public getBounds(gameObject: GameObject): Collider {
    return new Collider(gameObject, 0, 0, this.image.width, this.image.height);
  }

  public getHitboxes(gameObject: GameObject): Collider[] {
    return this.hitboxes.length === 0
      ? [this.getBounds(gameObject)]
      : this.hitboxes.map(
          (hitbox) =>
            new Collider(
              gameObject,
              hitbox.x,
              hitbox.y,
              hitbox.width,
              hitbox.height
            )
        );
  }
}
