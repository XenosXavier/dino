import { DinoCommand, DinoStateName } from "../dino";
import State from "./state";

export default class DuckState extends State {
  public override enter(): void {
    this.dino.animator.play(DinoStateName.Duck);
  }

  public override handleCommand(command: DinoCommand): void {
    if (DinoCommand.Jump === command) {
      this.dino.stateMachine.setState(DinoStateName.Jump);
    } else if (DinoCommand.None === command) {
      this.dino.stateMachine.setState(DinoStateName.Run);
    }
  }
}
