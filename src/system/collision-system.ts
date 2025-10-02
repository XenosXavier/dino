import Collider from "../component/collider";

interface Collidable {
  getBounds(): Collider;
  getHitboxes(): Collider[];
}

type OnCollision<Source extends Collidable, Target extends Collidable> = (
  source: Source,
  target: Target
) => void;

export default class CollisionSystem {
  public checkCollision<Source extends Collidable, Target extends Collidable>(
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

  private isBroadPhaseCollision(
    source: Collidable,
    target: Collidable
  ): boolean {
    return source.getBounds().isCollision(target.getBounds());
  }

  private isNarrowPhaseCollision(
    source: Collidable,
    target: Collidable
  ): boolean {
    const sourceHitboxes = source.getHitboxes();
    const targetHitboxes = target.getHitboxes();

    return sourceHitboxes.some((sourceHitbox) =>
      targetHitboxes.some((targetHitbox) =>
        sourceHitbox.isCollision(targetHitbox)
      )
    );
  }
}
