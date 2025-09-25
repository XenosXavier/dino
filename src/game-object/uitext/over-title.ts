import UIText, { Align } from "./uitext";

export default class OverTitle extends UIText {
  public constructor() {
    super({
      font: '12px "Press Start 2P"',
      color: "#535353",
      align: Align.Center,
    });
  }

  public override get text(): string {
    return "G A M E  O V E R";
  }
}
