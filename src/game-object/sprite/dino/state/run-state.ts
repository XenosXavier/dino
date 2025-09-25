import Collider from "../../../../component/collider";
import Bird from "../../obstacle/bird";
import Cactus from "../../obstacle/cactus";
import { Command, StateName } from "../dino";
import DinoState from "./dino-state";

export default class RunState extends DinoState {
  public override enter(): void {
    this.dino.animator.play(StateName.Run);
  }

  public override handleCommand(command: Command): void {
    if (Command.Jump === command) {
      this.dino.stateMachine.setState(StateName.Jump);
    } else if (Command.Down === command) {
      this.dino.stateMachine.setState(StateName.Duck);
    }
  }

  public override handleCollision(other: Collider): void {
    if (
      other.gameObject instanceof Cactus ||
      other.gameObject instanceof Bird
    ) {
      this.dino.stateMachine.setState(StateName.Dead);
    }
  }
}
