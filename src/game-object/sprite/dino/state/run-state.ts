import GameObject from "../../../game-object";
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

  public override handleCollision(gameObject: GameObject): void {
    if (gameObject instanceof Cactus || gameObject instanceof Bird) {
      this.dino.stateMachine.setState(StateName.Dead);
    }
  }
}
