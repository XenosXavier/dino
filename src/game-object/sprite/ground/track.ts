import CollisionBody from "../../../component/collision-body";
import ImageCollisionSource from "../../../component/image-collision-source";
import Rigidbody, { GravityMode } from "../../../component/rigidbody";
import Assets from "../../../resource/assets";
import Sprite from "../sprite";

export default class Track extends Sprite {
  private image: HTMLImageElement;
  private rigidbody: Rigidbody;
  private collisionBody: CollisionBody;

  public constructor(assets: Assets) {
    super();
    this.image = assets.getImage("track");
    this.addComponent((this.rigidbody = this.createRigidbody()));
    this.addComponent((this.collisionBody = this.createCollisionBody()));
  }

  public override update(deltaTime: number): void {
    this.rigidbody.update(deltaTime);
    this.x = this.width + ((this.x - this.width) % (this.width * 2));
  }

  public override get texture(): HTMLImageElement {
    return this.image;
  }

  private createRigidbody(): Rigidbody {
    return new Rigidbody(this, GravityMode.None);
  }

  private createCollisionBody(): CollisionBody {
    const source = new ImageCollisionSource(this.image);
    return new CollisionBody(this, source);
  }
}
