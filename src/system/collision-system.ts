import { CollisionBody } from "@component/collision";
import { GameObject } from "@game-object/core";

type OnCollision<Source extends GameObject, Target extends GameObject> = (
  source: Source,
  target: Target,
) => void;

export default class CollisionSystem {
  public checkCollision<Source extends GameObject, Target extends GameObject>(
    source: Source,
    targets: Target[],
    onCollision?: OnCollision<Source, Target>,
  ): void {
    targets.forEach((target) => {
      if (
        this.isBroadPhaseCollision(source, target) &&
        this.isNarrowPhaseCollision(source, target)
      ) {
        onCollision?.(source, target);
      }
    });
  }

  private isBroadPhaseCollision(
    source: GameObject,
    target: GameObject,
  ): boolean {
    const sourceCollisionBody = source.getComponent(CollisionBody);
    const targetCollisionBody = target.getComponent(CollisionBody);

    return (
      undefined !== sourceCollisionBody &&
      undefined !== targetCollisionBody &&
      sourceCollisionBody
        .getBounds()
        .isCollision(targetCollisionBody.getBounds())
    );
  }

  private isNarrowPhaseCollision(
    source: GameObject,
    target: GameObject,
  ): boolean {
    const sourceCollisionBody = source.getComponent(CollisionBody);
    const targetCollisionBody = target.getComponent(CollisionBody);

    return (
      sourceCollisionBody !== undefined &&
      targetCollisionBody !== undefined &&
      sourceCollisionBody
        .getHitboxes()
        .some((sourceHitbox) =>
          targetCollisionBody
            .getHitboxes()
            .some((targetHitbox) => sourceHitbox.isCollision(targetHitbox)),
        )
    );
  }
}
