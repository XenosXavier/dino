import Animation from "../../../component/animation";
import Collider from "../../../component/collider";
import Rigidbody, { GravityMode } from "../../../component/rigidbody";
import Assets from "../../../resource/assets";
import Config from "../../../resource/config";
import Sprite from "../sprite";
import { Rect } from "../../../types/geometry";

export default class Bird extends Sprite {
  private animation: Animation;
  private imageHitboxes: Record<string, Rect[]>;
  public rigidbody: Rigidbody;

  public constructor(assets: Assets, config: Config) {
    super();
    this.animation = new Animation([
      { key: "bird1", image: assets.getImage("bird1") },
      { key: "bird2", image: assets.getImage("bird2") },
    ]);
    this.imageHitboxes = {
      bird1: config.getImageHitboxes("bird1"),
      bird2: config.getImageHitboxes("bird2"),
    };
    this.rigidbody = new Rigidbody(this, GravityMode.None);
  }

  public getBounds(): Collider {
    return new Collider(this, 0, 0, this.width, this.height);
  }

  public getHitboxes(): Collider[] {
    const key = this.animation.getFrame().key;
    return this.imageHitboxes[key]!.map(
      (box) => new Collider(this, box.x, box.y, box.width, box.height)
    );
  }

  public override update(deltaTime: number): void {
    this.animation.update(deltaTime);
    this.rigidbody.update(deltaTime);
  }

  public override get texture(): HTMLImageElement {
    return this.animation.getFrame().image;
  }
}
