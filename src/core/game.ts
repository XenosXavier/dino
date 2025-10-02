import Assets from "../resource/assets";
import Config from "../resource/config";
import Pool from "../resource/pool";
import IdleScene from "../scene/idle-scene";
import LoadScene from "../scene/load-scene";
import OverScene from "../scene/over-scene";
import PlayScene from "../scene/play-scene";
import Scene from "../scene/scene";
import CollisionSystem from "../system/collision-system";
import RenderSystem from "../system/render-system";
import Canvas from "./canvas";
import InputSystem from "../system/input-system";

export enum SceneName {
  Load = "Load",
  Idle = "Idle",
  Play = "Play",
  Over = "Over",
}

export default class Game {
  public time: number;
  public width: number;
  public height: number;
  public assets: Assets;
  public pool: Pool;
  public config: Config;
  public canvas: Canvas;
  public inputSystem: InputSystem;
  public collisionSystem: CollisionSystem;
  public renderSystem: RenderSystem;
  public scenes: Record<SceneName, Scene>;
  public scene!: Scene;

  public constructor(canvas: HTMLCanvasElement, width: number, height: number) {
    this.time = 0;
    this.width = width;
    this.height = height;
    this.assets = new Assets();
    this.pool = new Pool();
    this.config = new Config();
    this.canvas = new Canvas(canvas, width, height);
    this.inputSystem = new InputSystem();
    this.collisionSystem = new CollisionSystem();
    this.renderSystem = new RenderSystem(this);
    this.scenes = this.createScenes();
    this.setScene(SceneName.Load);
  }

  public start(): void {
    requestAnimationFrame(this.run);
  }

  public run = (time: number): void => {
    const deltaTime = time - this.time;
    this.time = time;
    this.scene.update?.(deltaTime);
    requestAnimationFrame(this.run);
  };

  public setScene(name: SceneName): void {
    this.scene = this.scenes[name];
    this.scene.load?.();
    this.scene.init?.();
    this.scene.build?.();
  }

  private createScenes(): Record<SceneName, Scene> {
    return {
      [SceneName.Load]: new LoadScene(this),
      [SceneName.Idle]: new IdleScene(this),
      [SceneName.Play]: new PlayScene(this),
      [SceneName.Over]: new OverScene(this),
    };
  }
}
