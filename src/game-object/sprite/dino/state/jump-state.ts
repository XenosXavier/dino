import { GravityMode } from "@component/movement";

import { DinoCommand, DinoStateName } from "../dino";
import State from "./state";

export default class JumpState extends State {
  public override enter(): void {
    this.dino.animator.play(DinoStateName.Jump);
    this.dino.rigidbody.gravityMode = GravityMode.Normal;
    this.dino.rigidbody.velocity.set(0, -700);
  }

  public override exit(): void {
    this.dino.rigidbody.gravityMode = GravityMode.None;
    this.dino.rigidbody.velocity.set(0, 0);
  }

  public override handleCommand(command: DinoCommand): void {
    const gravityMode =
      DinoCommand.Down === command ? GravityMode.FastFall : GravityMode.Normal;
    this.dino.rigidbody.gravityMode = gravityMode;
  }
}
