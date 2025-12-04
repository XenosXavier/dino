import { DinoCommand, DinoStateName } from "../dino";
import State from "./state";

export default class RunState extends State {
  public override enter(): void {
    this.dino.animator.play(DinoStateName.Run);
  }

  public override handleCommand(command: DinoCommand): void {
    if (DinoCommand.Jump === command) {
      this.dino.stateMachine.setState(DinoStateName.Jump);
    } else if (DinoCommand.Down === command) {
      this.dino.stateMachine.setState(DinoStateName.Duck);
    }
  }
}
