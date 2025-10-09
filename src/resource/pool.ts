import Game from "../core/game";
import Dino from "../game-object/sprite/dino/dino";
import Track from "../game-object/sprite/ground/track";
import Bird from "../game-object/sprite/obstacle/bird";
import Cactus from "../game-object/sprite/obstacle/cactus";
import Curtain from "../game-object/sprite/ui/curtain";
import RestartIcon from "../game-object/sprite/ui/restartIcon";
import OverTitle from "../game-object/uitext/over-title";
import Scoreboard from "../game-object/uitext/scoreboard";

export default class Pool {
  private game: Game;
  private objects: Record<string, any>;

  public constructor(game: Game) {
    this.game = game;
    this.objects = {};
  }

  public getDino(): Dino {
    return this.get("dino", () => this.game.factory.createDino());
  }

  public getTracks(): Track[] {
    return this.get("tracks", () => [
      this.game.factory.createTrack(),
      this.game.factory.createTrack(),
    ]);
  }

  public getObstacles(): (Cactus | Bird)[] {
    return this.get("obstacle", () => []);
  }

  public getCurtain(): Curtain {
    return this.get("curtain", () => this.game.factory.createCurtain());
  }

  public getRestartIcon(): RestartIcon {
    return this.get("restart-icon", () =>
      this.game.factory.createRestartIcon()
    );
  }

  public getScoreboard(): Scoreboard {
    return this.get("scoreboard", () => this.game.factory.createScoreboard());
  }

  public getOverTitle(): OverTitle {
    return this.get("over-title", () => this.game.factory.createOverTitle());
  }

  private get<T>(key: string, factory: () => T): T {
    if (!this.objects[key]) {
      this.objects[key] = factory();
    }

    return this.objects[key] as T;
  }
}
