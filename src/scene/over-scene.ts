import { SceneName } from "../core/game";
import Dino from "../game-object/sprite/dino/dino";
import Track from "../game-object/sprite/ground/track";
import Bird from "../game-object/sprite/obstacle/bird";
import Cactus from "../game-object/sprite/obstacle/cactus";
import RestartIcon from "../game-object/sprite/ui/restartIcon";
import OverTitle from "../game-object/uitext/over-title";
import Scoreboard from "../game-object/uitext/scoreboard";
import Scene from "./scene";

export default class OverScene extends Scene {
  private dino!: Dino;
  private tracks!: Track[];
  private obstacles!: (Bird | Cactus)[];
  private scoreboard!: Scoreboard;
  private overTitle!: OverTitle;
  private restartIcon!: RestartIcon;

  public override load(): void {
    this.dino = this.game.pool.get(
      "dino",
      () => new Dino(this.game.assets, this.game.config)
    );
    this.tracks = this.game.pool.get("tracks", () => [
      new Track(this.game.assets),
      new Track(this.game.assets),
    ]);
    this.obstacles = this.game.pool.get("obstacles", () => []);
    this.scoreboard = this.game.pool.get("scoreboard", () => new Scoreboard());
    this.overTitle = this.game.pool.get("over-title", () => new OverTitle());
    this.restartIcon = this.game.pool.get(
      "restart-icon",
      () => new RestartIcon(this.game.assets)
    );
  }

  public override init(): void {
    this.game.inputSystem.onKey = this.handleInput;
  }

  public override build(): void {
    this.overTitle.setPosition(this.game.width / 2, 60);
    this.restartIcon.setPosition(
      (this.game.width - this.restartIcon.width) / 2,
      115
    );
  }

  public override update(deltaTime: number): void {
    this.renderGameObjects();
  }

  private renderGameObjects(): void {
    this.game.renderSystem.render([
      ...this.tracks,
      ...this.obstacles,
      this.scoreboard,
      this.dino,
      this.overTitle,
      this.restartIcon,
    ]);
  }

  private handleInput = (event: KeyboardEvent): void => {
    if (
      (event.code === "Space" ||
        event.code === "ArrowDown" ||
        event.code === "ArrowUp") &&
      event.type === "keyup"
    )
      this.game.setScene(SceneName.Play);
  };
}
