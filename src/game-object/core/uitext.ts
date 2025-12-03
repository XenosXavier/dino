import { Renderer, RenderingMode } from "@component/rendering";
import { GameObject } from "@game-object/core";
import { TextStyle } from "@type/ui";

export default class UIText extends GameObject {
  public text: string;
  public style: TextStyle;
  protected readonly renderer: Renderer;

  public constructor(text: string, style: TextStyle) {
    super();
    this.text = text;
    this.style = style;
    this.addComponent((this.renderer = this.createRenderer()));
  }

  private createRenderer(): Renderer {
    return new Renderer(this, RenderingMode.UIText);
  }
}
