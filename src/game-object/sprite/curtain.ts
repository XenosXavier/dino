import { Rigidbody } from "@component/movement";
import { Sprite } from "@game-object/core";
import { Texture } from "@module/graphics";

export default class Curtain extends Sprite {
  public readonly rigidbody: Rigidbody;

  public constructor(width: number, height: number) {
    super(Curtain.createTexture(width, height));
    this.addComponent((this.rigidbody = this.createRigidbody()));
  }

  public override update(deltaTime: number): void {
    this.rigidbody.update(deltaTime);
  }

  private static createTexture(width: number, height: number): Texture {
    return new Texture("curtain", Curtain.createImage(width, height));
  }

  private static createImage(width: number, height: number): HTMLImageElement {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d")!;
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    const image = new Image();
    image.src = canvas.toDataURL("image/png");
    return image;
  }

  private createRigidbody(): Rigidbody {
    return new Rigidbody(this);
  }
}
