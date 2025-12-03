import { Assets, Config } from "@resource";

import { SceneName } from "../game";
import Scene from "./scene";

export default class LoadScene extends Scene {
  public override load(): void {
    this.loadTextures().then(() => {
      this.setTextureHitboxes();
      this.game.sceneManager.setScene(SceneName.Idle);
    });
  }

  private loadTextures(): Promise<void[]> {
    const promises = [
      Assets.loadTexture("dino-idle", "../../assets/dino-idle.png", 0.5),
      Assets.loadTexture("dino-jump", "../../assets/dino-jump.png", 0.5),
      Assets.loadTexture("dino-dead", "../../assets/dino-dead.png", 0.5),
      Assets.loadTexture("dino-run1", "../../assets/dino-run1.png", 0.5),
      Assets.loadTexture("dino-run2", "../../assets/dino-run2.png", 0.5),
      Assets.loadTexture("dino-duck1", "../../assets/dino-duck1.png", 0.5),
      Assets.loadTexture("dino-duck2", "../../assets/dino-duck2.png", 0.5),
      Assets.loadTexture("track", "../../assets/track.png", 0.5),
      Assets.loadTexture("cactus1", "../../assets/cactus1.png", 0.5),
      Assets.loadTexture("cactus2", "../../assets/cactus2.png", 0.5),
      Assets.loadTexture("cactus3", "../../assets/cactus3.png", 0.5),
      Assets.loadTexture("big-cactus1", "../../assets/big-cactus1.png", 0.5),
      Assets.loadTexture("big-cactus2", "../../assets/big-cactus2.png", 0.5),
      Assets.loadTexture("big-cactus3", "../../assets/big-cactus3.png", 0.5),
      Assets.loadTexture(
        "pterodactyl-fly1",
        "../../assets/pterodactyl-fly1.png",
        0.5,
      ),
      Assets.loadTexture(
        "pterodactyl-fly2",
        "../../assets/pterodactyl-fly2.png",
        0.5,
      ),
      Assets.loadTexture("restart-icon", "../../assets/restart-icon.png", 0.5),
    ];
    return Promise.all(promises);
  }

  private setTextureHitboxes(): void {
    Config.setTextureHitboxes("dino-idle", [
      { x: 3, y: -17, width: 4, height: 8 },
      { x: 8, y: -12, width: 16, height: 10 },
      { x: 19, y: -17, width: 10, height: 12 },
      { x: 13, y: -2, width: 2, height: 10 },
      { x: 22, y: -2, width: 2, height: 10 },
      { x: 24, y: -31, width: 16, height: 12 },
    ]);
    Config.setTextureHitboxes("dino-jump", [
      { x: 3, y: -17, width: 4, height: 8 },
      { x: 8, y: -12, width: 16, height: 10 },
      { x: 19, y: -17, width: 10, height: 12 },
      { x: 13, y: -2, width: 2, height: 10 },
      { x: 22, y: -2, width: 2, height: 10 },
      { x: 24, y: -31, width: 16, height: 12 },
    ]);
    Config.setTextureHitboxes("dino-dead", [
      { x: 3, y: -17, width: 4, height: 8 },
      { x: 8, y: -12, width: 16, height: 10 },
      { x: 19, y: -17, width: 10, height: 12 },
      { x: 13, y: -2, width: 2, height: 10 },
      { x: 22, y: -2, width: 2, height: 10 },
      { x: 24, y: -31, width: 16, height: 12 },
    ]);
    Config.setTextureHitboxes("dino-run1", [
      { x: 3, y: -17, width: 4, height: 8 },
      { x: 8, y: -12, width: 16, height: 10 },
      { x: 19, y: -17, width: 10, height: 12 },
      { x: 13, y: -2, width: 2, height: 10 },
      { x: 22, y: -8, width: 2, height: 4 },
      { x: 24, y: -31, width: 16, height: 12 },
    ]);
    Config.setTextureHitboxes("dino-run2", [
      { x: 3, y: -17, width: 4, height: 8 },
      { x: 8, y: -12, width: 16, height: 10 },
      { x: 19, y: -17, width: 10, height: 12 },
      { x: 13, y: -6, width: 2, height: 6 },
      { x: 22, y: -2, width: 2, height: 10 },
      { x: 24, y: -31, width: 16, height: 12 },
    ]);
    Config.setTextureHitboxes("dino-duck1", [
      { x: 3, y: -18, width: 7, height: 5 },
      { x: 10, y: -13, width: 44, height: 11 },
      { x: 13, y: -6, width: 2, height: 8 },
      { x: 18, y: -2, width: 2, height: 11 },
      { x: 30, y: -7, width: 2, height: 6 },
    ]);
    Config.setTextureHitboxes("dino-duck2", [
      { x: 3, y: -18, width: 7, height: 5 },
      { x: 10, y: -13, width: 44, height: 11 },
      { x: 13, y: -2, width: 2, height: 11 },
      { x: 22, y: -8, width: 2, height: 5 },
      { x: 30, y: -7, width: 2, height: 6 },
    ]);
    Config.setTextureHitboxes("cactus1", [
      { x: 2, y: -13, width: 2, height: 11 },
      { x: 7, y: 0, width: 3, height: 33 },
      { x: 13, y: -17, width: 2, height: 11 },
    ]);
    Config.setTextureHitboxes("cactus2", [
      { x: 2, y: -13, width: 2, height: 11 },
      { x: 7, y: 0, width: 3, height: 33 },
      { x: 13, y: -17, width: 2, height: 11 },
      { x: 19, y: -20, width: 2, height: 9 },
      { x: 24, y: 0, width: 3, height: 33 },
      { x: 30, y: -15, width: 2, height: 13 },
    ]);
    Config.setTextureHitboxes("cactus3", [
      { x: 2, y: -13, width: 2, height: 11 },
      { x: 7, y: 0, width: 3, height: 33 },
      { x: 13, y: -17, width: 2, height: 11 },
      { x: 19, y: -13, width: 2, height: 16 },
      { x: 24, y: 0, width: 3, height: 33 },
      { x: 30, y: -11, width: 2, height: 14 },
      { x: 36, y: -18, width: 2, height: 11 },
      { x: 41, y: 0, width: 3, height: 33 },
      { x: 47, y: -16, width: 2, height: 12 },
    ]);
    Config.setTextureHitboxes("big-cactus1", [
      { x: 2, y: -20, width: 3, height: 16 },
      { x: 10, y: -3, width: 5, height: 45 },
      { x: 20, y: -22, width: 3, height: 16 },
    ]);
    Config.setTextureHitboxes("big-cactus2", [
      { x: 2, y: -20, width: 3, height: 16 },
      { x: 10, y: -3, width: 5, height: 45 },
      { x: 20, y: -22, width: 3, height: 16 },
      { x: 27, y: -28, width: 3, height: 15 },
      { x: 35, y: -3, width: 5, height: 45 },
      { x: 45, y: -22, width: 3, height: 16 },
    ]);
    Config.setTextureHitboxes("big-cactus3", [
      { x: 2, y: -20, width: 3, height: 16 },
      { x: 10, y: -2, width: 5, height: 46 },
      { x: 20, y: -21, width: 2, height: 16 },
      { x: 26, y: -18, width: 2, height: 14 },
      { x: 32, y: -2, width: 3, height: 43 },
      { x: 40, y: -32, width: 2, height: 8 },
      { x: 52, y: -26, width: 3, height: 16 },
      { x: 60, y: -2, width: 5, height: 46 },
      { x: 70, y: -22, width: 3, height: 15 },
    ]);
    Config.setTextureHitboxes("pterodactyl-fly1", [
      { x: 6, y: -22, width: 5, height: 4 },
      { x: 11, y: -20, width: 6, height: 9 },
      { x: 18, y: -15, width: 15, height: 7 },
      { x: 21, y: -4, width: 4, height: 11 },
      { x: 25, y: -13, width: 14, height: 6 },
    ]);
    Config.setTextureHitboxes("pterodactyl-fly2", [
      { x: 3, y: -12, width: 5, height: 4 },
      { x: 8, y: -11, width: 8, height: 8 },
      { x: 16, y: -6, width: 15, height: 8 },
      { x: 18, y: -19, width: 3, height: 5 },
      { x: 19, y: -14, width: 7, height: 5 },
      { x: 22, y: -4, width: 14, height: 5 },
    ]);
    Config.setTextureHitboxes("track", [
      {
        x: 0,
        y: 0,
        width: 1202,
        height: 14,
      },
    ]);
  }
}
