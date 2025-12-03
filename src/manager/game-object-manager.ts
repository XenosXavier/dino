import { Sprite, UIText } from "@game-object/core";
import { Cactus, Curtain, Dino, Pterodactyl, Track } from "@game-object/sprite";
import { Scoreboard } from "@game-object/uitext";
import { Assets } from "@resource";
import { TextAlign } from "@type/ui";

export default class GameObjectManager {
  private static gameObjects: Record<string, any> = {};

  public static getDino(): Dino {
    return GameObjectManager.get("dino", () => new Dino());
  }

  public static getTracks(): Track[] {
    return GameObjectManager.get("tracks", () => [new Track(), new Track()]);
  }

  public static getObstacles(): (Pterodactyl | Cactus)[] {
    return GameObjectManager.get("obstacles", () => []);
  }

  public static getCurtain(): Curtain {
    return GameObjectManager.get("curtain", () => new Curtain(540, 150));
  }

  public static getRestartIcon(): Sprite {
    return GameObjectManager.get(
      "restart-icon",
      () => new Sprite(Assets.getTexture("restart-icon")),
    );
  }

  public static getScoreboard(): Scoreboard {
    return GameObjectManager.get("scoreboard", () => new Scoreboard());
  }

  public static getGameOverText(): UIText {
    return GameObjectManager.get(
      "game-over-title",
      () =>
        new UIText("G A M E  O V E R", {
          font: '13px "Press Start 2P"',
          color: "#535353",
          align: TextAlign.Center,
        }),
    );
  }

  private static get<T>(key: string, factory: () => T): T {
    if (!this.gameObjects[key]) {
      this.gameObjects[key] = factory();
    }

    return this.gameObjects[key] as T;
  }
}
