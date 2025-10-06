import GameObject from "../game-object/game-object";
import { Rect } from "../types/geometry";
import Animation from "./animation";
import Collider from "./collider";
import { CollisionSource } from "./collision-body";

export default class AnimationCollisionSource implements CollisionSource {
  private animation: Animation;
  private hitboxes: Record<string, Rect[]>;

  public constructor(animation: Animation, hitboxes: Record<string, Rect[]>) {
    this.animation = animation;
    this.hitboxes = hitboxes;
  }

  public getBounds(gameObject: GameObject): Collider {
    const image = this.animation.getFrame().image;
    return new Collider(gameObject, 0, 0, image.width, image.height);
  }

  public getHitboxes(gameObject: GameObject): Collider[] {
    const key = this.animation.getFrame().key;
    const hitboxes = this.hitboxes[key]!;
    return hitboxes.map(
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
