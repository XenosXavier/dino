import Animation from "../../../component/animation";
import Rigidbody, { GravityMode } from "../../../component/rigidbody";
import Assets from "../../../resource/assets";
import Config from "../../../resource/config";
import Sprite from "../sprite";
import CollisionBody from "../../../component/collision-body";
import AnimationCollisionSource from "../../../component/animation-collision-source";

export default class Bird extends Sprite {
  private animation: Animation;
  private rigidbody: Rigidbody;
  private collisionBody: CollisionBody;

  public constructor(assets: Assets, config: Config) {
    super();
    this.addComponent((this.animation = this.createAnimation(assets)));
    this.addComponent((this.rigidbody = this.createRigidbody()));
    this.addComponent((this.collisionBody = this.createCollisionBody(config)));
  }

  public override update(deltaTime: number): void {
    this.animation.update(deltaTime);
    this.rigidbody.update(deltaTime);
  }

  public override get texture(): HTMLImageElement {
    return this.animation.getFrame().image;
  }

  private createAnimation(assets: Assets): Animation {
    return new Animation([
      { key: "bird1", image: assets.getImage("bird1") },
      { key: "bird2", image: assets.getImage("bird2") },
    ]);
  }

  private createRigidbody(): Rigidbody {
    return new Rigidbody(this, GravityMode.None);
  }

  private createCollisionBody(config: Config): CollisionBody {
    const hitboxes = {
      bird1: config.getImageHitboxes("bird1"),
      bird2: config.getImageHitboxes("bird2"),
    };
    const source = new AnimationCollisionSource(this.animation, hitboxes);
    return new CollisionBody(this, source);
  }
}
