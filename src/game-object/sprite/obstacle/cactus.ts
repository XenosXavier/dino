import Collider from "../../../component/collider";
import Rigidbody, { GravityMode } from "../../../component/rigidbody";
import Assets from "../../../resource/assets";
import Sprite from "../sprite";

export default class Cactus extends Sprite {
  private image: HTMLImageElement;
  public collider: Collider;
  public rigidbody: Rigidbody;

  public constructor(assets: Assets) {
    super();
    this.image = this.chooseImage(assets);
    this.collider = new Collider(this, 0, 0, this.width, this.height);
    this.rigidbody = new Rigidbody(this, GravityMode.None);
  }

  private chooseImage(assets: Assets): HTMLImageElement {
    const imageKeys = [
      "cactus1",
      "cactus2",
      "cactus3",
      "big-cactus1",
      "big-cactus2",
      "big-cactus3",
    ];
    const index = Math.floor(Math.random() * imageKeys.length);
    return assets.getImage(imageKeys[index]!);
  }

  public override update(deltaTime: number): void {
    this.rigidbody.update(deltaTime);
  }

  public override get texture(): HTMLImageElement {
    return this.image;
  }
}
