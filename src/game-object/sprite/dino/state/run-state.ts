import Animator from "../../../../component/animator";
import StateMachine from "../../../../component/state-machine";
import GameObject from "../../../game-object";
import Bird from "../../obstacle/bird";
import Cactus from "../../obstacle/cactus";
import { Command, StateName } from "../dino";
import DinoState from "./dino-state";

export default class RunState extends DinoState {
  public override enter(): void {
    this.dino.getComponent(Animator)?.play(StateName.Run);
  }

  public override handleCommand(command: Command): void {
    if (Command.Jump === command) {
      this.dino.getComponent(StateMachine)?.setState(StateName.Jump);
    } else if (Command.Down === command) {
      this.dino.getComponent(StateMachine)?.setState(StateName.Duck);
    }
  }

  public override handleCollision(gameObject: GameObject): void {
    if (gameObject instanceof Cactus || gameObject instanceof Bird) {
      this.dino.getComponent(StateMachine)?.setState(StateName.Dead);
    }
  }
}
