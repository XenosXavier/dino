import Collider from "../../../../component/collider";
import Bird from "../../obstacle/bird";
import Cactus from "../../obstacle/cactus";
import { Command, StateName } from "../dino";
import DinoState from "./dino-state";

export default class DuckState extends DinoState {
  public override enter(): void {
    this.dino.animator.play(StateName.Duck);
  }

  public override handleCommand(command: Command): void {
    if (Command.Jump === command) {
      this.dino.stateMachine.setState(StateName.Jump);
    } else if (Command.None === command) {
      this.dino.stateMachine.setState(StateName.Run);
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
