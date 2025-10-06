import { UITextStyle } from "../../types/uitext";
import GameObject from "../game-object";

export default abstract class UIText extends GameObject {
  public style: UITextStyle;

  public constructor(style: UITextStyle) {
    super();
    this.style = style;
  }

  public abstract get text(): string;
}
