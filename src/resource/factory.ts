import Game from "../core/game";
import Dino from "../game-object/sprite/dino/dino";
import Track from "../game-object/sprite/ground/track";
import Bird from "../game-object/sprite/obstacle/bird";
import Cactus from "../game-object/sprite/obstacle/cactus";
import Curtain from "../game-object/sprite/ui/curtain";
import RestartIcon from "../game-object/sprite/ui/restartIcon";
import OverTitle from "../game-object/uitext/over-title";
import Scoreboard from "../game-object/uitext/scoreboard";

export default class Factory {
  private game: Game;

  public constructor(game: Game) {
    this.game = game;
  }

  public createDino(): Dino {
    return new Dino(this.game.assets, this.game.config);
  }

  public createTrack(): Track {
    return new Track(this.game.assets);
  }

  public createBird(): Bird {
    return new Bird(this.game.assets, this.game.config);
  }

  public createCactus(): Cactus {
    return new Cactus(this.game.assets, this.game.config);
  }

  public createCurtain(): Curtain {
    return new Curtain(540, 150);
  }

  public createRestartIcon(): RestartIcon {
    return new RestartIcon(this.game.assets);
  }

  public createScoreboard(): Scoreboard {
    return new Scoreboard();
  }

  public createOverTitle(): OverTitle {
    return new OverTitle();
  }
}
