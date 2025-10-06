import GameObject from "../game-object/game-object";
import { Rect } from "../types/geometry";
import Animator from "./animator";
import Collider from "./collider";
import { CollisionSource } from "./collision-body";

export default class AnimatorCollisionSource implements CollisionSource {
  private animator: Animator<any>;
  private hitboxes: Record<string, Rect[]>;

  public constructor(
    animator: Animator<any>,
    hitboxes: Record<string, Rect[]>
  ) {
    this.animator = animator;
    this.hitboxes = hitboxes;
  }

  public getBounds(gameObject: GameObject): Collider {
    const image = this.animator.getFrame().image;
    return new Collider(gameObject, 0, 0, image.width, image.height);
  }

  public getHitboxes(gameObject: GameObject): Collider[] {
    const key = this.animator.getFrame().key;
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
