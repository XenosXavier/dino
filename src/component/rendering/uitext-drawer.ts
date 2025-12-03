import { Canvas } from "@display";
import { UIText } from "@game-object/core";

import { Drawer } from "./renderer";

export default class UITextDrawer implements Drawer {
  public draw(uiText: UIText, canvas: Canvas): void {
    canvas.drawText(
      uiText.text,
      uiText.style,
      uiText.position.x,
      uiText.position.y,
    );
  }
}
