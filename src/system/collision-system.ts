import CollisionBody from "../component/collision-body";
import GameObject from "../game-object/game-object";

type OnCollision<Source extends GameObject, Target extends GameObject> = (
  source: Source,
  target: Target
) => void;

export default class CollisionSystem {
  public checkCollision<Source extends GameObject, Target extends GameObject>(
    source: Source,
    targets: Target[],
    onCollision?: OnCollision<Source, Target>
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

  public isBroadPhaseCollision(
    source: GameObject,
    target: GameObject
  ): boolean {
    const sourceCollisionBody = source.getComponent(CollisionBody);
    const targetCollisionBody = target.getComponent(CollisionBody);

    return (
      sourceCollisionBody !== undefined &&
      targetCollisionBody !== undefined &&
      sourceCollisionBody
        .getBounds()
        .isCollision(targetCollisionBody.getBounds())
    );
  }

  public isNarrowPhaseCollision(
    source: GameObject,
    target: GameObject
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
            .some((targetHitbox) => sourceHitbox.isCollision(targetHitbox))
        )
    );
  }
}
