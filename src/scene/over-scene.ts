import { Sprite, UIText } from "@game-object/core";
import { Cactus, Dino, Pterodactyl, Track } from "@game-object/sprite";
import { Scoreboard } from "@game-object/uitext";
import { GameObjectManager } from "@manager";

import { SceneName } from "../game";
import Scene from "./scene";

export default class OverScene extends Scene {
  private dino!: Dino;
  private tracks!: Track[];
  private obstacles!: (Pterodactyl | Cactus)[];
  private scoreboard!: Scoreboard;
  private gameOverText!: UIText;
  private restartIcon!: Sprite;

  public override load(): void {
    this.dino = GameObjectManager.getDino();
    this.tracks = GameObjectManager.getTracks();
    this.obstacles = GameObjectManager.getObstacles();
    this.scoreboard = GameObjectManager.getScoreboard();
    this.gameOverText = GameObjectManager.getGameOverText();
    this.restartIcon = GameObjectManager.getRestartIcon();
  }

  public override init(): void {
    this.game.inputSystem.onKey = this.handleInput;
  }

  public override build(): void {
    const canvas = this.game.canvas;
    this.gameOverText.position.set(canvas.width / 2, 60);
    this.restartIcon.position.set(
      (canvas.width - this.restartIcon.width) / 2,
      115,
    );
  }

  public override update(_deltaTime: number): void {
    this.renderGameObjects();
    this.debugGameObjects();
  }

  private handleInput = (e: KeyboardEvent): void => {
    if ("F4" === e.code && "keydown" === e.type) {
      this.game.debugSystem.isEnabled = !this.game.debugSystem.isEnabled;
    }

    if (
      (e.code === "Space" || e.code === "ArrowDown" || e.code === "ArrowUp") &&
      e.type === "keyup"
    )
      this.game.sceneManager.setScene(SceneName.Play);
  };

  private renderGameObjects(): void {
    this.game.renderSystem.render(
      [
        ...this.tracks,
        ...this.obstacles,
        this.dino,
        this.scoreboard,
        this.gameOverText,
        this.restartIcon,
      ],
      this.game.canvas,
    );
  }

  private debugGameObjects(): void {
    this.game.debugSystem.renderColliders(
      [...this.tracks, ...this.obstacles, this.dino],
      this.game.canvas,
    );
  }
}
