import Collider from "../component/collider";
import Game from "../core/game";
import GameObject from "../game-object/game-object";
import Sprite from "../game-object/sprite/sprite";
import UIText from "../game-object/uitext/uitext";

export enum RenderMode {
  Play,
  Debug,
}

interface Collidable {
  getBounds(): Collider;
  getHitboxes(): Collider[];
}

export default class RenderSystem {
  private game: Game;
  private renderMode: RenderMode;

  public constructor(game: Game) {
    this.game = game;
    this.renderMode = RenderMode.Play;
  }

  public render(gameObjects: GameObject[]): void {
    this.game.canvas.clear();

    gameObjects.forEach((gameObject) => {
      if (gameObject instanceof Sprite) {
        this.renderSprite(gameObject);
      } else if (gameObject instanceof UIText) {
        this.renderText(gameObject);
      }

      if (
        RenderMode.Debug === this.renderMode &&
        this.isCollidable(gameObject)
      ) {
        (gameObject as unknown as Collidable)
          .getHitboxes()
          .forEach((box) => this.renderCollider(box));
      }
    });
  }

  private renderSprite(sprite: Sprite): void {
    const texture = sprite.texture;
    this.game.canvas.drawImage(
      texture,
      sprite.x,
      sprite.y - texture.height,
      texture.width,
      texture.height
    );
  }

  private renderText(uitext: UIText): void {
    this.game.canvas.drawText(uitext.text, uitext.style, uitext.x, uitext.y);
  }

  private renderCollider(collider: Collider): void {
    this.game.canvas.drawRect(
      collider.left,
      collider.top,
      collider.right - collider.left,
      collider.bottom - collider.top
    );
  }

  /**
   * DOTO: Use the other way to render collider
   */
  private isCollidable(obj: any): boolean {
    return (
      obj !== null &&
      typeof obj === "object" &&
      typeof obj.getBounds === "function" &&
      typeof obj.getHitboxes === "function"
    );
  }
}
