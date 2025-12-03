import { Cactus, Pterodactyl } from "@game-object/sprite";
import { Scoreboard } from "@game-object/uitext";

export default class ObstacleManager {
  private readonly spwanInterval = 1500;
  private spawnElapsedTime = 0;
  private obstacles: (Pterodactyl | Cactus)[];
  private scoreboard: Scoreboard;

  public constructor(
    obstacles: (Pterodactyl | Cactus)[],
    scoreboard: Scoreboard,
  ) {
    this.obstacles = obstacles;
    this.scoreboard = scoreboard;
  }

  public update(deltaTime: number): void {
    this.removeOffScreenObstacles();
    this.trySpawnObstacle(deltaTime);
  }

  private removeOffScreenObstacles(): void {
    const index = this.obstacles.findIndex(
      (obstacle) => obstacle.position.x + obstacle.width > 0,
    );
    this.obstacles.splice(0, index);
  }

  private trySpawnObstacle(deltaTime: number): void {
    this.spawnElapsedTime += deltaTime;

    if (this.spawnElapsedTime > this.spwanInterval) {
      this.spawnElapsedTime %= this.spwanInterval;
      this.obstacles.push(this.spawnObstacle());
    }
  }

  private spawnObstacle(): Pterodactyl | Cactus {
    const score = this.scoreboard.getCurrentScore();
    const canSpawnPterodactyl = 300 < score && Math.random() * 100 > 70;
    return canSpawnPterodactyl ? this.spawnPterodactyl() : this.spawnCactus();
  }

  private spawnPterodactyl(): Pterodactyl {
    const y = Math.floor(Math.random() * 3) * 20 + 100;
    const pterodactyl = new Pterodactyl();
    pterodactyl.position.set(1000, y);
    pterodactyl.rigidbody.velocity.set(-400, 0);
    return pterodactyl;
  }

  private spawnCactus(): Cactus {
    const cactus = new Cactus();
    cactus.position.set(1000, 150);
    cactus.rigidbody.velocity.set(-300, 0);
    return cactus;
  }
}
