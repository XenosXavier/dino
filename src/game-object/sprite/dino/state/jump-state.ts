import Animator from "../../../../component/animator";
import Rigidbody, { GravityMode } from "../../../../component/rigidbody";
import StateMachine from "../../../../component/state-machine";
import GameObject from "../../../game-object";
import Track from "../../ground/track";
import Bird from "../../obstacle/bird";
import Cactus from "../../obstacle/cactus";
import { Command, StateName } from "../dino";
import DinoState from "./dino-state";

export default class JumpState extends DinoState {
  public override enter(): void {
    this.dino.getComponent(Animator)?.play(StateName.Jump);
    this.dino.getComponent(Rigidbody)?.setGravityMode(GravityMode.Normal);
    this.dino.getComponent(Rigidbody)?.setVelocity(0, -700);
  }

  public override handleCommand(command: Command): void {
    const gravityMode =
      Command.Down === command ? GravityMode.FastFall : GravityMode.Normal;
    this.dino.getComponent(Rigidbody)?.setGravityMode(gravityMode);
  }

  public override exit(): void {
    this.dino.getComponent(Rigidbody)?.setGravityMode(GravityMode.None);
    this.dino.getComponent(Rigidbody)?.setVelocity(0, 0);
  }

  public override handleCollision(gameObject: GameObject): void {
    if (gameObject instanceof Cactus || gameObject instanceof Bird) {
      this.dino.getComponent(StateMachine)?.setState(StateName.Dead);
    } else if (gameObject instanceof Track && this.dino.y > gameObject.y) {
      const name =
        GravityMode.Normal ===
        this.dino.getComponent(Rigidbody)?.getGravityMode()
          ? StateName.Run
          : StateName.Duck;
      this.dino.y = gameObject.y;
      this.dino.getComponent(StateMachine)?.setState(name);
      this.dino.onGround?.();
    }
  }
}
