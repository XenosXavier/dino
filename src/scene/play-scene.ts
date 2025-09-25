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
    this.dino = this.game.pool.get("dino", () => new Dino(this.game.assets));
    this.tracks = this.game.pool.get("tracks", () => [
      new Track(this.game.assets),
      new Track(this.game.assets),
    ]);
    this.obstacles = this.game.pool.get("obstacles", () => []);
    this.scoreboard = this.game.pool.get("scoreboard", () => new Scoreboard());
  }

  public override init(): void {
    this.game.input.onKey = this.handleInput;
    this.spawnElapsedTime = 0;
    this.speed = 1;
    this.dino.reset();
    this.dino.onDead = this.handleGameOver;
    this.dino.onGround = null;
    this.tracks.forEach((track) => track.rigidbody.setVelocity(-300, 0));
    this.obstacles.length = 0;
    this.scoreboard.resetCurrentScore();
  }

  public override build(): void {
    this.dino.setPosition(50, 150);
    this.tracks[0]?.setPosition(0, 150);
    this.tracks[1]?.setPosition(this.tracks[1].width, 150);
    this.scoreboard.setPosition(this.game.width - 20, 20);
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

      if (this.scoreboard.getCurrentScore() > 500 && Math.random() * 100 > 70) {
        this.spawnBird();
      } else {
        this.spawnCactus();
      }
    }
  }

  private spawnCactus(): void {
    const cactus = new Cactus(this.game.assets);
    cactus.setPosition(1000, 150);
    cactus.rigidbody.setVelocity(-300, 0);
    this.obstacles.push(cactus);
  }

  private spawnBird(): void {
    const y = Math.floor(Math.random() * 3 + 2) * 35;
    const bird = new Bird(this.game.assets);
    bird.setPosition(1000, y);
    bird.rigidbody.setVelocity(-400, 0);
    this.obstacles.push(bird);
  }

  private updateGameObjects(deltaTime: number): void {
    [...this.tracks, ...this.obstacles, this.scoreboard, this.dino].forEach(
      (gameObject) => gameObject.update?.(deltaTime)
    );
  }

  private checkCollision(): void {
    [...this.tracks, ...this.obstacles].forEach((gameObject) => {
      this.dino.collider.checkCollision(gameObject.collider);
    });
  }

  private renderGameObjects(): void {
    this.game.canvas.clear();
    [...this.tracks, ...this.obstacles, this.scoreboard, this.dino].forEach(
      (gameObject) => this.game.renderer.render(gameObject, this.game.canvas)
    );
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
