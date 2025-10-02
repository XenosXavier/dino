import Animation from "../../../component/animation";
import Animator from "../../../component/animator";
import Collider from "../../../component/collider";
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
import { Rect } from "../../../types/geometry";

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
  public animator: Animator<StateName>;
  public stateMachine: StateMachine<StateName, DinoState>;
  private imageHitboxes: Record<string, Rect[]>;

  public constructor(assets: Assets, config: Config) {
    super();
    this.rigidbody = new Rigidbody(this, GravityMode.None);
    this.animator = this.createAnimator(assets);
    this.stateMachine = this.createStateMachine();
    this.imageHitboxes = this.createImageHitboxes(config);
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

  public getBounds(): Collider {
    return new Collider(this, 0, 0, this.width, this.height);
  }

  public getHitboxes(): Collider[] {
    const key = this.animator.getFrame().key;
    return this.imageHitboxes[key]!.map(
      (box) => new Collider(this, box.x, box.y, box.width, box.height)
    );
  }

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

  private createImageHitboxes(config: Config): Record<string, Rect[]> {
    return {
      "dino-idle": config.getImageHitboxes("dino-idle"),
      "dino-run1": config.getImageHitboxes("dino-run1"),
      "dino-run2": config.getImageHitboxes("dino-run2"),
      "dino-duck1": config.getImageHitboxes("dino-duck1"),
      "dino-duck2": config.getImageHitboxes("dino-duck2"),
      "dino-jump": config.getImageHitboxes("dino-jump"),
      "dino-dead": config.getImageHitboxes("dino-dead"),
    };
  }
}
