import { Scene } from "@scene";

export default class SceneManager<SceneName extends string> {
  private scenes: Record<SceneName, Scene>;
  private currentScene!: Scene;

  public constructor(
    scenes: Record<SceneName, Scene>,
    initialScene: SceneName,
  ) {
    this.scenes = scenes;
    this.setScene(initialScene);
  }

  public getCurrentScene(): Scene {
    return this.currentScene;
  }

  public setScene(name: SceneName): void {
    this.currentScene = this.scenes[name];
    this.currentScene.load?.();
    this.currentScene.init?.();
    this.currentScene.build?.();
  }
}
