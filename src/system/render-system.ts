import { Renderer } from "@component/rendering";
import { Canvas } from "@display";
import { GameObject } from "@game-object/core";

export default class RenderSystem {
  public render(gameObjects: GameObject[], canvas: Canvas): void {
    canvas.clear();
    gameObjects.forEach((gameObject) => {
      const renderer = gameObject.getComponent(Renderer);
      renderer?.render(canvas);
    });
  }
}
