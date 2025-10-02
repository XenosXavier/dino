import { GravityMode } from "../../../../component/rigidbody";
import GameObject from "../../../game-object";
import Track from "../../ground/track";
import Bird from "../../obstacle/bird";
import Cactus from "../../obstacle/cactus";
import { Command, StateName } from "../dino";
import DinoState from "./dino-state";

export default class JumpState extends DinoState {
  public override enter(): void {
    this.dino.animator.play(StateName.Jump);
    this.dino.rigidbody.setGravityMode(GravityMode.Normal);
    this.dino.rigidbody.setVelocity(0, -700);
  }

  public override handleCommand(command: Command): void {
    const gravityMode =
      Command.Down === command ? GravityMode.FastFall : GravityMode.Normal;
    this.dino.rigidbody.setGravityMode(gravityMode);
  }

  public override exit(): void {
    this.dino.rigidbody.setGravityMode(GravityMode.None);
  }

  public override handleCollision(gameObject: GameObject): void {
    if (gameObject instanceof Cactus || gameObject instanceof Bird) {
      this.dino.stateMachine.setState(StateName.Dead);
    } else if (gameObject instanceof Track && this.dino.y > gameObject.y) {
      this.dino.y = gameObject.y;
      this.dino.rigidbody.setVelocity(0, 0);
      const name =
        GravityMode.Normal === this.dino.rigidbody.gravityMode
          ? StateName.Run
          : StateName.Duck;
      this.dino.stateMachine.setState(name);
      this.dino.onGround?.();
    }
  }
}
