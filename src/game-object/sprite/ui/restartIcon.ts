import Assets from "../../../resource/assets";
import Sprite from "../sprite";

export default class RestartIcon extends Sprite {
  private image: HTMLImageElement;

  public constructor(assets: Assets) {
    super();
    this.image = assets.getImage("restart");
  }

  public override get texture(): HTMLImageElement {
    return this.image;
  }
}
