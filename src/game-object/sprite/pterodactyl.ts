import { CollisionBody } from "@component/collision";
import { Rigidbody } from "@component/movement";
import { Sprite } from "@game-object/core";
import { Animator, Clip } from "@module/animation";
import { Assets } from "@resource";

enum PterodactylStateName {
  Fly = "fly",
}

export default class Pterodactyl extends Sprite {
  public readonly animator: Animator<PterodactylStateName>;
  public readonly rigidbody: Rigidbody;
  public readonly collisionBody: CollisionBody;

  public constructor() {
    const animator = Pterodactyl.createAnimator();
    super(animator);
    this.animator = animator;
    this.addComponent((this.rigidbody = this.createRigidbody()));
    this.addComponent((this.collisionBody = this.createCollisionBody()));
  }

  public override update(deltaTime: number): void {
    this.animator.update(deltaTime);
    this.rigidbody.update(deltaTime);
  }

  private static createAnimator(): Animator<PterodactylStateName> {
    return new Animator<PterodactylStateName>(
      {
        [PterodactylStateName.Fly]: new Clip([
          { texture: Assets.getTexture("pterodactyl-fly1"), duration: 450 },
          { texture: Assets.getTexture("pterodactyl-fly2"), duration: 300 },
        ]),
      },
      PterodactylStateName.Fly,
    );
  }

  private createRigidbody(): Rigidbody {
    return new Rigidbody(this);
  }

  private createCollisionBody(): CollisionBody {
    return new CollisionBody(this);
  }
}
