import { CollisionBody } from "@component/collision";
import { GravityMode, Rigidbody } from "@component/movement";
import { GameObject, Sprite } from "@game-object/core";
import { Cactus, Pterodactyl, Track } from "@game-object/sprite";
import { Animator, Clip } from "@module/animation";
import { Assets } from "@resource";

import {
  DeadState,
  DuckState,
  IdleState,
  JumpState,
  RunState,
  StateMachine,
} from "./state";

export enum DinoStateName {
  Idle = "idle",
  Run = "run",
  Duck = "duck",
  Jump = "jump",
  Dead = "dead",
}

export enum DinoCommand {
  Down = "down",
  Jump = "jump",
  None = "none",
}

export default class Dino extends Sprite {
  public onGround?: (() => void) | null;
  public onDead?: (() => void) | null;
  public readonly animator: Animator<DinoStateName>;
  public readonly stateMachine: StateMachine<DinoStateName>;
  public readonly rigidbody: Rigidbody;
  public readonly collisionBody: CollisionBody;

  public constructor() {
    const animator = Dino.createAnimator();
    super(animator);
    this.animator = animator;
    this.stateMachine = this.createStateMachine();
    this.addComponent((this.rigidbody = this.createRigidbody()));
    this.addComponent((this.collisionBody = this.createCollisionBody()));
  }

  public override update(deltaTime: number): void {
    this.animator.update(deltaTime);
    this.rigidbody.update(deltaTime);
  }

  public reset(): void {
    this.rigidbody.velocity.set(0, 0);
    this.stateMachine.setState(DinoStateName.Run);
  }

  public handleCommand(command: DinoCommand): void {
    const state = this.stateMachine.getCurrentState();
    state.handleCommand?.(command);
  }

  public handleCollision(gameObject: GameObject): void {
    if (gameObject instanceof Pterodactyl || gameObject instanceof Cactus) {
      this.stateMachine.setState(DinoStateName.Dead);
    } else if (
      gameObject instanceof Track &&
      this.position.y > gameObject.position.y
    ) {
      const name =
        GravityMode.Normal === this.rigidbody.gravityMode
          ? DinoStateName.Run
          : DinoStateName.Duck;
      this.stateMachine.setState(name);
      this.position.y = gameObject.position.y;
      this.onGround?.();
    }
  }

  private static createAnimator(): Animator<DinoStateName> {
    return new Animator<DinoStateName>(
      {
        [DinoStateName.Idle]: new Clip([
          { texture: Assets.getTexture("dino-idle"), duration: 120 },
        ]),
        [DinoStateName.Run]: new Clip([
          { texture: Assets.getTexture("dino-run1"), duration: 120 },
          { texture: Assets.getTexture("dino-run2"), duration: 120 },
        ]),
        [DinoStateName.Duck]: new Clip([
          { texture: Assets.getTexture("dino-duck1"), duration: 120 },
          { texture: Assets.getTexture("dino-duck2"), duration: 120 },
        ]),
        [DinoStateName.Jump]: new Clip([
          { texture: Assets.getTexture("dino-jump"), duration: 120 },
        ]),
        [DinoStateName.Dead]: new Clip([
          { texture: Assets.getTexture("dino-dead"), duration: 120 },
        ]),
      },
      DinoStateName.Idle,
    );
  }

  private createStateMachine(): StateMachine<DinoStateName> {
    return new StateMachine<DinoStateName>(
      {
        [DinoStateName.Idle]: new IdleState(this),
        [DinoStateName.Run]: new RunState(this),
        [DinoStateName.Duck]: new DuckState(this),
        [DinoStateName.Jump]: new JumpState(this),
        [DinoStateName.Dead]: new DeadState(this),
      },
      DinoStateName.Idle,
    );
  }

  private createRigidbody(): Rigidbody {
    return new Rigidbody(this);
  }

  private createCollisionBody(): CollisionBody {
    return new CollisionBody(this);
  }
}
