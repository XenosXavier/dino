import { CollisionBody } from "@component/collision";
import { Canvas } from "@display";
import { GameObject } from "@game-object/core";

export default class DebugSystem {
  public isEnabled: boolean;

  public constructor() {
    this.isEnabled = false;
  }

  public renderColliders(gameObjects: GameObject[], canvas: Canvas): void {
    if (this.isEnabled) {
      gameObjects.forEach((gameObject) => {
        const collisionBody = gameObject.getComponent(CollisionBody);

        if (collisionBody !== undefined) {
          const hitboxes = collisionBody.getHitboxes();
          hitboxes.forEach((hitbox) => {
            const x = hitbox.left;
            const y = hitbox.top;
            const width = hitbox.right - hitbox.left;
            const height = hitbox.bottom - hitbox.top;
            canvas.drawRect("red", x, y, width, height);
          });
        }
      });
    }
  }
}
