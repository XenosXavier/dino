import { Canvas } from "@display";
import { SceneManager } from "@manager";
import { IdleScene, LoadScene, OverScene, PlayScene } from "@scene";
import {
  CollisionSystem,
  DebugSystem,
  InputSystem,
  RenderSystem,
} from "@system";

export enum SceneName {
  Load = "load",
  Idle = "idle",
  Play = "play",
  Over = "over",
}

export default class Game {
  public readonly canvas: Canvas;
  public readonly inputSystem: InputSystem;
  public readonly renderSystem: RenderSystem;
  public readonly collisionSystem: CollisionSystem;
  public readonly debugSystem: DebugSystem;
  public readonly sceneManager: SceneManager<SceneName>;
  private time;

  public constructor(canvas: HTMLCanvasElement, width: number, height: number) {
    this.canvas = new Canvas(canvas, width, height);
    this.inputSystem = new InputSystem();
    this.renderSystem = new RenderSystem();
    this.collisionSystem = new CollisionSystem();
    this.debugSystem = new DebugSystem();
    this.sceneManager = this.createSceneManager();
    this.time = 0;
  }

  public start(): void {
    requestAnimationFrame(this.run);
  }

  private run = (time: number): void => {
    const deltaTime = time - this.time;
    this.time = time;
    this.sceneManager.getCurrentScene().update?.(deltaTime);
    requestAnimationFrame(this.run);
  };

  private createSceneManager(): SceneManager<SceneName> {
    return new SceneManager<SceneName>(
      {
        [SceneName.Load]: new LoadScene(this),
        [SceneName.Idle]: new IdleScene(this),
        [SceneName.Play]: new PlayScene(this),
        [SceneName.Over]: new OverScene(this),
      },
      SceneName.Load,
    );
  }
}
