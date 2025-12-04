import { CollisionBody } from "@component/collision";
import { Rigidbody } from "@component/movement";
import { Sprite } from "@game-object/core";
import { Assets } from "@resource";

const CACTUS_TEXTURE_KEYS = [
  "cactus1",
  "cactus2",
  "cactus3",
  "big-cactus1",
  "big-cactus2",
  "big-cactus3",
];

export default class Cactus extends Sprite {
  public readonly rigidbody: Rigidbody;
  public readonly collisionBody: CollisionBody;

  public constructor() {
    const key = Cactus.chooseTextureKey();
    super(Assets.getTexture(key));
    this.addComponent((this.rigidbody = this.createRigidbody()));
    this.addComponent((this.collisionBody = this.createCollisionBody()));
  }

  public override update(deltaTime: number): void {
    this.rigidbody.update(deltaTime);
  }

  private static chooseTextureKey(): string {
    const index = Math.floor(Math.random() * CACTUS_TEXTURE_KEYS.length);
    return CACTUS_TEXTURE_KEYS[index]!;
  }

  private createRigidbody(): Rigidbody {
    return new Rigidbody(this);
  }

  private createCollisionBody(): CollisionBody {
    return new CollisionBody(this);
  }
}
