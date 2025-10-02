import Collider from "../../../component/collider";
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
  private bounds: Collider;
  private hitboxes: Collider[];
  public rigidbody: Rigidbody;

  public constructor(assets: Assets, config: Config) {
    super();
    const key = this.chooseImageKey();
    this.image = assets.getImage(key);
    this.bounds = new Collider(this, 0, 0, this.width, this.height);
    this.hitboxes = config
      .getImageHitboxes(key)
      .map((box) => new Collider(this, box.x, box.y, box.width, box.height));
    this.rigidbody = new Rigidbody(this, GravityMode.None);
  }

  private chooseImageKey(): string {
    const index = Math.floor(Math.random() * CACTUS_IMAGE_KEYS.length);
    return CACTUS_IMAGE_KEYS[index]!;
  }

  public getBounds(): Collider {
    return this.bounds;
  }

  public getHitboxes(): Collider[] {
    return this.hitboxes;
  }

  public override update(deltaTime: number): void {
    this.rigidbody.update(deltaTime);
  }

  public override get texture(): HTMLImageElement {
    return this.image;
  }
}
