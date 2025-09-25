import Rigidbody, { GravityMode } from "../../../component/rigidbody";
import Sprite from "../sprite";

export default class Curtain extends Sprite {
  private image: HTMLImageElement;
  public rigidbody: Rigidbody;

  public constructor(width: number, height: number) {
    super();
    this.image = this.createImage(width, height);
    this.rigidbody = new Rigidbody(this, GravityMode.None);
  }

  private createImage(width: number, height: number): HTMLImageElement {
    const image = new Image();
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d")!;
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    image.src = canvas.toDataURL("image/png");
    return image;
  }

  public override update(deltaTime: number): void {
    this.rigidbody.update(deltaTime);
  }

  public override get texture(): HTMLImageElement {
    return this.image;
  }
}
