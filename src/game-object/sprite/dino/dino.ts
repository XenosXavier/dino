import Animation from "../../../component/animation";
import Animator from "../../../component/animator";
import Collider from "../../../component/collider";
import Rigidbody, { GravityMode } from "../../../component/rigidbody";
import StateMachine from "../../../component/state-machine";
import Assets from "../../../resource/assets";
import Sprite from "../sprite";
import DeadState from "./state/dead-state";
import DinoState from "./state/dino-state";
import DuckState from "./state/duck-state";
import IdleState from "./state/idle-state";
import JumpState from "./state/jump-state";
import RunState from "./state/run-state";

export enum StateName {
  Idle = "Idle",
  Run = "Run",
  Duck = "Duck",
  Jump = "Jump",
  Dead = "Dead",
}

export enum Command {
  Down,
  Jump,
  None,
}

export default class Dino extends Sprite {
  public onDead?: (() => void) | null;
  public onGround?: (() => void) | null;
  public rigidbody: Rigidbody;
  public collider: Collider;
  public animator: Animator<StateName>;
  public stateMachine: StateMachine<StateName, DinoState>;

  public constructor(assets: Assets) {
    super();
    this.rigidbody = new Rigidbody(this, GravityMode.None);
    this.collider = new Collider(this, 0, 0, 0, 0);
    this.animator = this.createAnimator(assets);
    this.stateMachine = this.createStateMachine();
    this.collider.setCollisionHandler(this.handleCollision);
  }

  public reset(): void {
    this.stateMachine.setState(StateName.Run);
    this.rigidbody.setGravityMode(GravityMode.None);
    this.rigidbody.setVelocity(0, 0);
  }

  public handleCommand(command: Command): void {
    this.stateMachine.getState().handleCommand?.(command);
  }

  private handleCollision = (other: Collider): void => {
    this.stateMachine.getState().handleCollision?.(other);
  };

  public override update(deltaTime: number): void {
    this.animator.update(deltaTime);
    this.rigidbody.update(deltaTime);
    this.collider.setSize(this.texture.width, this.texture.height);
  }

  public override get texture(): HTMLImageElement {
    return this.animator.getFrame();
  }

  private createAnimator(assets: Assets): Animator<StateName> {
    return new Animator<StateName>(
      {
        [StateName.Idle]: new Animation([assets.getImage("dino-idle")]),
        [StateName.Run]: new Animation([
          assets.getImage("dino-run1"),
          assets.getImage("dino-run2"),
        ]),
        [StateName.Duck]: new Animation([
          assets.getImage("dino-duck1"),
          assets.getImage("dino-duck2"),
        ]),
        [StateName.Jump]: new Animation([assets.getImage("dino-jump")]),
        [StateName.Dead]: new Animation([assets.getImage("dino-dead")]),
      },
      StateName.Idle
    );
  }

  private createStateMachine(): StateMachine<StateName, DinoState> {
    return new StateMachine<StateName, DinoState>(
      {
        [StateName.Idle]: new IdleState(this),
        [StateName.Run]: new RunState(this),
        [StateName.Duck]: new DuckState(this),
        [StateName.Jump]: new JumpState(this),
        [StateName.Dead]: new DeadState(this),
      },
      StateName.Idle
    );
  }
}
