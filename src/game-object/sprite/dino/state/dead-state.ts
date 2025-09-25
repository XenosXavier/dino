import { StateName } from "../dino";
import State from "./dino-state";

export default class DeadState extends State {
  public override enter(): void {
    this.dino.animator.play(StateName.Dead);
    this.dino.onDead?.();
  }
}
