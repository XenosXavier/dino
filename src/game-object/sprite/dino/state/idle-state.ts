import { Command, StateName } from "../dino";
import DinoState from "./dino-state";

export default class IdleState extends DinoState {
  public override enter(): void {
    this.dino.animator.play(StateName.Idle);
  }

  public override handleCommand(command: Command): void {
    if (Command.Jump === command) {
      this.dino.stateMachine.setState(StateName.Jump);
    }
  }
}
