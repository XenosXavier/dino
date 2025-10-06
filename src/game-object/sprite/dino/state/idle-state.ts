import Animator from "../../../../component/animator";
import StateMachine from "../../../../component/state-machine";
import { Command, StateName } from "../dino";
import DinoState from "./dino-state";

export default class IdleState extends DinoState {
  public override enter(): void {
    this.dino.getComponent(Animator)?.play(StateName.Idle);
  }

  public override handleCommand(command: Command): void {
    if (Command.Jump === command) {
      this.dino.getComponent(StateMachine)?.setState(StateName.Jump);
    }
  }
}
