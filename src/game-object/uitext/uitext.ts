import Position from "../../component/position";
import { UITextStyle } from "../../types/uitext";
import GameObject from "../game-object";

export default abstract class UIText extends GameObject {
  public style: UITextStyle;
  protected position: Position;

  public constructor(style: UITextStyle) {
    super();
    this.style = style;
    this.addComponent((this.position = new Position()));
  }

  public get x(): number {
    return this.position.x;
  }

  public get y(): number {
    return this.position.y;
  }

  public abstract get text(): string;
}
