import Position from "../component/position";
import Rigidbody from "../component/rigidbody";
import { SceneName } from "../core/game";
import Dino, { Command } from "../game-object/sprite/dino/dino";
import Track from "../game-object/sprite/ground/track";
import Bird from "../game-object/sprite/obstacle/bird";
import Cactus from "../game-object/sprite/obstacle/cactus";
import Scoreboard from "../game-object/uitext/scoreboard";
import Scene from "./scene";

export default class PlayScene extends Scene {
  private readonly spawnInterval = 1500;
  private spawnElapsedTime = 0;
  private speed = 0;
  private dino!: Dino;
  private tracks!: Track[];
  private obstacles!: (Bird | Cactus)[];
  private scoreboard!: Scoreboard;

  public override load(): void {
    this.dino = this.game.pool.getDino();
    this.tracks = this.game.pool.getTracks();
    this.obstacles = this.game.pool.getObstacles();
    this.scoreboard = this.game.pool.getScoreboard();
  }

  public override init(): void {
    this.game.inputSystem.onKey = this.handleInput;
    this.spawnElapsedTime = 0;
    this.speed = 1;
    this.dino.reset();
    this.dino.onDead = this.handleGameOver;
    this.dino.onGround = null;
    this.tracks.forEach((track) =>
      track.getComponent(Rigidbody)?.setVelocity(-300, 0)
    );
    this.obstacles.length = 0;
    this.scoreboard.resetCurrentScore();
  }

  public override build(): void {
    this.dino.getComponent(Position)?.set(50, 150);
    this.tracks[0]?.getComponent(Position)?.set(0, 150);
    this.tracks[1]?.getComponent(Position)?.set(this.tracks[1].width, 150);
    this.scoreboard.getComponent(Position)?.set(this.game.width - 20, 20);
  }

  public override update(deltaTime: number): void {
    this.updateSpeed(deltaTime);
    const scaledDeltaTime = deltaTime * this.speed;
    this.updateObstacles(scaledDeltaTime);
    this.updateGameObjects(scaledDeltaTime);
    this.checkCollision();
    this.renderGameObjects();
  }

  private updateSpeed(deltaTime: number): void {
    this.speed = Math.min(1.8, this.speed + deltaTime / 100000);
  }

  private updateObstacles(deltaTime: number): void {
    this.removeObstacles();
    this.spawnObstacle(deltaTime);
  }

  private removeObstacles() {
    const index = this.obstacles.findIndex(
      (obstacle) => obstacle.x + obstacle.width > 0
    );
    this.obstacles.splice(0, index);
  }

  private spawnObstacle(deltaTime: number): void {
    this.spawnElapsedTime += deltaTime;

    if (this.spawnElapsedTime > this.spawnInterval) {
      this.spawnElapsedTime %= this.spawnInterval;

      if (this.scoreboard.getCurrentScore() > 200 && Math.random() * 100 > 50) {
        this.spawnBird();
      } else {
        this.spawnCactus();
      }
    }
  }

  private spawnCactus(): void {
    const cactus = this.game.factory.createCactus();
    cactus.getComponent(Position)?.set(1000, 150);
    cactus.getComponent(Rigidbody)?.setVelocity(-300, 0);
    this.obstacles.push(cactus);
  }

  private spawnBird(): void {
    const bird = this.game.factory.createBird();
    const y = Math.floor(Math.random() * 3) * 20 + 100;
    bird.getComponent(Position)?.set(1000, y);
    bird.getComponent(Rigidbody)?.setVelocity(-400, 0);
    this.obstacles.push(bird);
  }

  private updateGameObjects(deltaTime: number): void {
    [...this.tracks, ...this.obstacles, this.scoreboard, this.dino].forEach(
      (gameObject) => gameObject.update?.(deltaTime)
    );
  }

  private checkCollision(): void {
    this.game.collisionSystem.checkCollision(
      this.dino,
      [...this.tracks, ...this.obstacles],
      (dino, gameObject) => {
        dino.handleCollision(gameObject);
      }
    );
  }

  private renderGameObjects(): void {
    this.game.renderSystem.render([
      ...this.tracks,
      ...this.obstacles,
      this.scoreboard,
      this.dino,
    ]);
  }

  private handleInput = (e: KeyboardEvent): void => {
    if ((e.code === "Space" || e.code === "ArrowUp") && e.type === "keydown") {
      this.dino.handleCommand(Command.Jump);
    } else if (e.code === "ArrowDown" && e.type === "keydown") {
      this.dino.handleCommand(Command.Down);
    } else {
      this.dino.handleCommand(Command.None);
    }
  };

  private handleGameOver = (): void => {
    this.scoreboard.updateHighestScore();
    this.game.setScene(SceneName.Over);
  };
}
