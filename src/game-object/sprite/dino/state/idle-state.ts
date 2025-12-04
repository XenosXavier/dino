import { DinoCommand, DinoStateName } from "../dino";
import State from "./state";

export default class IdleState extends State {
  public override enter(): void {
    this.dino.animator.play(DinoStateName.Idle);
  }

  public override handleCommand(command: DinoCommand): void {
    if (DinoCommand.Jump === command) {
      this.dino.stateMachine.setState(DinoStateName.Jump);
    }
  }
}
