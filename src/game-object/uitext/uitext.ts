import GameObject from "../game-object";

export enum Align {
  Left = "left",
  Right = "right",
  Center = "center",
}

export interface UITextStyle {
  font: string;
  color: string;
  align: Align;
}

export default abstract class UIText extends GameObject {
  public style: UITextStyle;

  public constructor(style: UITextStyle) {
    super();
    this.style = style;
  }

  public abstract get text(): string;
}
