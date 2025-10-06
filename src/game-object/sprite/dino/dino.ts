import Animation from "../../../component/animation";
import Animator from "../../../component/animator";
import Rigidbody, { GravityMode } from "../../../component/rigidbody";
import StateMachine from "../../../component/state-machine";
import Assets from "../../../resource/assets";
import Config from "../../../resource/config";
import GameObject from "../../game-object";
import Sprite from "../sprite";
import DeadState from "./state/dead-state";
import DinoState from "./state/dino-state";
import DuckState from "./state/duck-state";
import IdleState from "./state/idle-state";
import JumpState from "./state/jump-state";
import RunState from "./state/run-state";
import CollisionBody from "../../../component/collision-body";
import AnimatorCollisionSource from "../../../component/animator-collision-source";

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
  private animator: Animator<StateName>;
  private stateMachine: StateMachine<StateName, DinoState>;
  private rigidbody: Rigidbody;
  private collisionBody: CollisionBody;

  public constructor(assets: Assets, config: Config) {
    super();
    this.addComponent((this.animator = this.createAnimator(assets)));
    this.addComponent((this.stateMachine = this.createStateMachine()));
    this.addComponent((this.rigidbody = this.createRigidbody()));
    this.addComponent((this.collisionBody = this.createCollisionBody(config)));
  }

  public reset(): void {
    this.stateMachine.setState(StateName.Run);
    this.rigidbody.setGravityMode(GravityMode.None);
    this.rigidbody.setVelocity(0, 0);
  }

  public handleCommand(command: Command): void {
    this.stateMachine.getState().handleCommand?.(command);
  }

  public handleCollision = (gameObject: GameObject): void => {
    this.stateMachine.getState().handleCollision?.(gameObject);
  };

  public override update(deltaTime: number): void {
    this.animator.update(deltaTime);
    this.rigidbody.update(deltaTime);
  }

  public override get texture(): HTMLImageElement {
    return this.animator.getFrame().image;
  }

  private createAnimator(assets: Assets): Animator<StateName> {
    return new Animator<StateName>(
      {
        [StateName.Idle]: new Animation([
          { key: "dino-idle", image: assets.getImage("dino-idle") },
        ]),
        [StateName.Run]: new Animation([
          { key: "dino-run1", image: assets.getImage("dino-run1") },
          { key: "dino-run2", image: assets.getImage("dino-run2") },
        ]),
        [StateName.Duck]: new Animation([
          { key: "dino-duck1", image: assets.getImage("dino-duck1") },
          { key: "dino-duck2", image: assets.getImage("dino-duck2") },
        ]),
        [StateName.Jump]: new Animation([
          { key: "dino-jump", image: assets.getImage("dino-jump") },
        ]),
        [StateName.Dead]: new Animation([
          { key: "dino-dead", image: assets.getImage("dino-dead") },
        ]),
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

  private createRigidbody(): Rigidbody {
    return new Rigidbody(this, GravityMode.None);
  }

  private createCollisionBody(config: Config): CollisionBody {
    const hitboxes = {
      "dino-idle": config.getImageHitboxes("dino-idle"),
      "dino-run1": config.getImageHitboxes("dino-run1"),
      "dino-run2": config.getImageHitboxes("dino-run2"),
      "dino-duck1": config.getImageHitboxes("dino-duck1"),
      "dino-duck2": config.getImageHitboxes("dino-duck2"),
      "dino-jump": config.getImageHitboxes("dino-jump"),
      "dino-dead": config.getImageHitboxes("dino-dead"),
    };
    const source = new AnimatorCollisionSource(this.animator, hitboxes);
    return new CollisionBody(this, source);
  }
}
