import CollisionBody from "../../../component/collision-body";
import ImageCollisionSource from "../../../component/image-collision-source";
import Rigidbody, { GravityMode } from "../../../component/rigidbody";
import Assets from "../../../resource/assets";
import Config from "../../../resource/config";
import Sprite from "../sprite";

const CACTUS_IMAGE_KEYS = [
  "cactus1",
  "cactus2",
  "cactus3",
  "big-cactus1",
  "big-cactus2",
  "big-cactus3",
];

export default class Cactus extends Sprite {
  private image: HTMLImageElement;
  private rigidbody: Rigidbody;
  private collisionBody: CollisionBody;

  public constructor(assets: Assets, config: Config) {
    super();
    const key = this.chooseImageKey();
    this.image = assets.getImage(key);
    this.addComponent((this.rigidbody = this.createRigidbody()));
    this.addComponent(
      (this.collisionBody = this.createCollisionBody(key, config))
    );
  }

  public override update(deltaTime: number): void {
    this.rigidbody.update(deltaTime);
  }

  public override get texture(): HTMLImageElement {
    return this.image;
  }

  private chooseImageKey(): string {
    const index = Math.floor(Math.random() * CACTUS_IMAGE_KEYS.length);
    return CACTUS_IMAGE_KEYS[index]!;
  }

  private createRigidbody(): Rigidbody {
    return new Rigidbody(this, GravityMode.None);
  }

  private createCollisionBody(key: string, config: Config): CollisionBody {
    const hitboxes = config.getImageHitboxes(key);
    const source = new ImageCollisionSource(this.image, hitboxes);
    return new CollisionBody(this, source);
  }
}
