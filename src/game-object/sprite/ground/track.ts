import Collider from "../../../component/collider";
import Rigidbody, { GravityMode } from "../../../component/rigidbody";
import Assets from "../../../resource/assets";
import Sprite from "../sprite";

export default class Track extends Sprite {
  private image: HTMLImageElement;
  public collider: Collider;
  public rigidbody: Rigidbody;

  public constructor(assets: Assets) {
    super();
    this.image = assets.getImage("track");
    this.collider = new Collider(this, 0, 0, this.width, this.height);
    this.rigidbody = new Rigidbody(this, GravityMode.None);
  }

  public override update(deltaTime: number): void {
    this.rigidbody.update(deltaTime);
    this.x = this.width + ((this.x - this.width) % (this.width * 2));
  }

  public override get texture(): HTMLImageElement {
    return this.image;
  }
}
