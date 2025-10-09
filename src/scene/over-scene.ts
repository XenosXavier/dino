import Position from "../component/position";
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
    this.dino = this.game.pool.getDino();
    this.tracks = this.game.pool.getTracks();
    this.obstacles = this.game.pool.getObstacles();
    this.scoreboard = this.game.pool.getScoreboard();
    this.overTitle = this.game.pool.getOverTitle();
    this.restartIcon = this.game.pool.getRestartIcon();
  }

  public override init(): void {
    this.game.inputSystem.onKey = this.handleInput;
  }

  public override build(): void {
    this.overTitle.getComponent(Position)?.set(this.game.width / 2, 60);
    this.restartIcon
      .getComponent(Position)
      ?.set((this.game.width - this.restartIcon.width) / 2, 115);
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
