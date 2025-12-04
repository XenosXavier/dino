import { DinoStateName } from "../dino";
import State from "./state";

export default class DeadState extends State {
  public override enter(): void {
    this.dino.animator.play(DinoStateName.Dead);
    this.dino.onDead?.();
  }
}
