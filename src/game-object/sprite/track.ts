import { CollisionBody } from "@component/collision";
import { Rigidbody } from "@component/movement";
import { Sprite } from "@game-object/core";
import { Assets } from "@resource";

export default class Track extends Sprite {
  public readonly rigidbody: Rigidbody;
  public readonly collisionBody: CollisionBody;

  public constructor() {
    super(Assets.getTexture("track"));
    this.addComponent((this.rigidbody = this.createRigidbody()));
    this.addComponent((this.collisionBody = this.createCollisionBody()));
  }

  public override update(deltaTime: number): void {
    this.rigidbody.update(deltaTime);
    this.position.x =
      this.width + ((this.position.x - this.width) % (this.width * 2));
  }

  private createRigidbody(): Rigidbody {
    return new Rigidbody(this);
  }

  private createCollisionBody(): CollisionBody {
    return new CollisionBody(this);
  }
}
