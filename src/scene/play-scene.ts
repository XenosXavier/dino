import {
  Cactus,
  Dino,
  DinoCommand,
  Pterodactyl,
  Track,
} from "@game-object/sprite";
import { Scoreboard } from "@game-object/uitext";
import { GameObjectManager, ObstacleManager } from "@manager";

import { SceneName } from "../game";
import Scene from "./scene";

export default class PlayScene extends Scene {
  private speed!: number;
  private dino!: Dino;
  private tracks!: Track[];
  private obstacles!: (Pterodactyl | Cactus)[];
  private scoreboard!: Scoreboard;
  private obstacleManager!: ObstacleManager;

  public override load(): void {
    this.dino = GameObjectManager.getDino();
    this.tracks = GameObjectManager.getTracks();
    this.scoreboard = GameObjectManager.getScoreboard();
    this.obstacles = GameObjectManager.getObstacles();
    this.obstacleManager = new ObstacleManager(this.obstacles, this.scoreboard);
  }

  public override init(): void {
    this.game.inputSystem.onKey = this.handleInput;
    this.speed = 1;
    this.dino.onDead = this.startCutscene;
    this.dino.reset();
    this.tracks.forEach((track) => track.rigidbody.velocity.set(-300, 0));
    this.scoreboard.resetCurrentScore();
    this.obstacles.length = 0;
  }

  public override build(): void {
    this.dino.position.set(50, 150);
    this.tracks[0]?.position.set(0, 150);
    this.tracks[1]?.position.set(this.tracks[1].width, 150);
    this.scoreboard.position.set(580, 20);
  }

  public override update(deltaTime: number): void {
    this.updateSpeed();
    this.obstacleManager.update(deltaTime * this.speed);
    this.updateGameObjects(deltaTime * this.speed);
    this.checkCollisions();
    this.renderGameObjects();
    this.debugGameObjects();
  }

  private handleInput = (e: KeyboardEvent): void => {
    if ("F4" === e.code && "keydown" === e.type) {
      this.game.debugSystem.isEnabled = !this.game.debugSystem.isEnabled;
    }

    if ((e.code === "Space" || e.code === "ArrowUp") && e.type === "keydown") {
      this.dino.handleCommand(DinoCommand.Jump);
    } else if (e.code === "ArrowDown" && e.type === "keydown") {
      this.dino.handleCommand(DinoCommand.Down);
    } else {
      this.dino.handleCommand(DinoCommand.None);
    }
  };

  private startCutscene = (): void => {
    this.scoreboard.updateHighestScore();
    this.game.sceneManager.setScene(SceneName.Over);
  };

  private updateSpeed(): void {
    const score = this.scoreboard.getCurrentScore();
    this.speed = 1 + Math.min(0.5, score / 1000);
  }

  private updateGameObjects(deltaTime: number): void {
    [...this.tracks, ...this.obstacles, this.dino, this.scoreboard].forEach(
      (gameObject) => gameObject.update?.(deltaTime),
    );
  }

  private checkCollisions(): void {
    this.game.collisionSystem.checkCollision(
      this.dino,
      [...this.tracks, ...this.obstacles],
      (dino, gameObject) => dino.handleCollision(gameObject),
    );
  }

  private renderGameObjects(): void {
    this.game.renderSystem.render(
      [...this.tracks, ...this.obstacles, this.dino, this.scoreboard],
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
