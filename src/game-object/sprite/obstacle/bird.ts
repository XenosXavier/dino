import Animation from "../../../component/animation";
import Collider from "../../../component/collider";
import Rigidbody, { GravityMode } from "../../../component/rigidbody";
import Assets from "../../../resource/assets";
import Sprite from "../sprite";

export default class Bird extends Sprite {
  private animation: Animation;
  public collider: Collider;
  public rigidbody: Rigidbody;

  public constructor(assets: Assets) {
    super();
    this.animation = new Animation([
      assets.getImage("bird1"),
      assets.getImage("bird2"),
    ]);
    this.collider = new Collider(this, 0, 0, this.width, this.height);
    this.rigidbody = new Rigidbody(this, GravityMode.None);
  }

  public override update(deltaTime: number): void {
    this.animation.update(deltaTime);
    this.rigidbody.update(deltaTime);
  }

  public override get texture(): HTMLImageElement {
    return this.animation.getFrame();
  }
}
