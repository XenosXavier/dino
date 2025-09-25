import Collider from "../component/collider";
import GameObject from "../game-object/game-object";
import Sprite from "../game-object/sprite/sprite";
import UIText from "../game-object/uitext/uitext";
import Canvas from "./canvas";

export default class Renderer {
  public render(gameObject: GameObject, canvas: Canvas): void;
  public render(collider: Collider, canvas: Canvas): void;

  public render(object: any, canvas: Canvas): void {
    if (object instanceof Sprite) {
      this.renderSprite(object, canvas);
    } else if (object instanceof UIText) {
      this.renderText(object, canvas);
    } else if (object instanceof Collider) {
      this.renderCollider(object, canvas);
    }
  }

  private renderSprite(sprite: Sprite, canvas: Canvas): void {
    const texture = sprite.texture;
    canvas.drawImage(
      texture,
      sprite.x,
      sprite.y - texture.height,
      texture.width,
      texture.height
    );
  }

  private renderText(uitext: UIText, canvas: Canvas): void {
    canvas.drawText(uitext.text, uitext.style, uitext.x, uitext.y);
  }

  private renderCollider(collider: Collider, canvas: Canvas): void {
    canvas.drawRect(
      collider.left,
      collider.top,
      collider.right - collider.left,
      collider.bottom - collider.top
    );
  }
}
