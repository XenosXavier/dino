import { Component } from "@component/core";
import { Canvas } from "@display";
import { GameObject } from "@game-object/core";

import SpriteDrawer from "./sprite-drawer";
import UITextDrawer from "./uitext-drawer";

export interface Drawer {
  draw(gameObject: GameObject, canvas: Canvas): void;
}

export enum RenderingMode {
  UIText = "uiText",
  Sprite = "sprite",
}

const DRAWERS: Record<RenderingMode, Drawer> = {
  [RenderingMode.UIText]: new UITextDrawer(),
  [RenderingMode.Sprite]: new SpriteDrawer(),
};

export default class Renderer extends Component {
  private drawer: Drawer;

  public constructor(gameObject: GameObject, mode: RenderingMode) {
    super(gameObject);
    this.drawer = DRAWERS[mode];
  }

  public render(canvas: Canvas): void {
    this.drawer.draw(this.gameObject, canvas);
  }
}
