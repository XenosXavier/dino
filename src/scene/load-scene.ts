import { SceneName } from "../core/game";
import Scene from "./scene";

export default class LoadScene extends Scene {
  public override load(): void {
    this.loadImages().then(() => {
      this.setImageHitboxes();
      this.game.setScene(SceneName.Idle);
    });
  }

  private loadImages(): Promise<void[]> {
    const assets = this.game.assets;
    const promises = [
      assets.loadImage("dino-idle", "../../assets/dino.png", 0.5),
      assets.loadImage("dino-jump", "../../assets/dino-jump.png", 0.5),
      assets.loadImage("dino-dead", "../../assets/dino-dead.png", 0.5),
      assets.loadImage("dino-run1", "../../assets/dino-run1.png", 0.5),
      assets.loadImage("dino-run2", "../../assets/dino-run2.png", 0.5),
      assets.loadImage("dino-duck1", "../../assets/dino-duck1.png", 0.5),
      assets.loadImage("dino-duck2", "../../assets/dino-duck2.png", 0.5),
      assets.loadImage("track", "../../assets/track.png", 0.5),
      assets.loadImage("cactus1", "../../assets/cactus1.png", 0.5),
      assets.loadImage("cactus2", "../../assets/cactus2.png", 0.5),
      assets.loadImage("cactus3", "../../assets/cactus3.png", 0.5),
      assets.loadImage("big-cactus1", "../../assets/big-cactus1.png", 0.5),
      assets.loadImage("big-cactus2", "../../assets/big-cactus2.png", 0.5),
      assets.loadImage("big-cactus3", "../../assets/big-cactus3.png", 0.5),
      assets.loadImage("bird1", "../../assets/bird1.png", 0.5),
      assets.loadImage("bird2", "../../assets/bird2.png", 0.5),
      assets.loadImage("restart", "../../assets/restart.png", 0.5),
    ];

    return Promise.all(promises);
  }

  private setImageHitboxes(): void {
    this.game.config.setImageHitboxes("dino-idle", [
      { x: 3, y: -17, width: 4, height: 8 },
      { x: 8, y: -12, width: 16, height: 10 },
      { x: 19, y: -17, width: 10, height: 12 },
      { x: 13, y: -2, width: 2, height: 10 },
      { x: 22, y: -2, width: 2, height: 10 },
      { x: 24, y: -31, width: 16, height: 12 },
    ]);
    this.game.config.setImageHitboxes("dino-jump", [
      { x: 3, y: -17, width: 4, height: 8 },
      { x: 8, y: -12, width: 16, height: 10 },
      { x: 19, y: -17, width: 10, height: 12 },
      { x: 13, y: -2, width: 2, height: 10 },
      { x: 22, y: -2, width: 2, height: 10 },
      { x: 24, y: -31, width: 16, height: 12 },
    ]);
    this.game.config.setImageHitboxes("dino-dead", [
      { x: 3, y: -17, width: 4, height: 8 },
      { x: 8, y: -12, width: 16, height: 10 },
      { x: 19, y: -17, width: 10, height: 12 },
      { x: 13, y: -2, width: 2, height: 10 },
      { x: 22, y: -2, width: 2, height: 10 },
      { x: 24, y: -31, width: 16, height: 12 },
    ]);
    this.game.config.setImageHitboxes("dino-run1", [
      { x: 3, y: -17, width: 4, height: 8 },
      { x: 8, y: -12, width: 16, height: 10 },
      { x: 19, y: -17, width: 10, height: 12 },
      { x: 13, y: -2, width: 2, height: 10 },
      { x: 22, y: -8, width: 2, height: 4 },
      { x: 24, y: -31, width: 16, height: 12 },
    ]);
    this.game.config.setImageHitboxes("dino-run2", [
      { x: 3, y: -17, width: 4, height: 8 },
      { x: 8, y: -12, width: 16, height: 10 },
      { x: 19, y: -17, width: 10, height: 12 },
      { x: 13, y: -6, width: 2, height: 6 },
      { x: 22, y: -2, width: 2, height: 10 },
      { x: 24, y: -31, width: 16, height: 12 },
    ]);
    this.game.config.setImageHitboxes("dino-duck1", [
      { x: 3, y: -18, width: 7, height: 5 },
      { x: 10, y: -13, width: 44, height: 11 },
      { x: 13, y: -6, width: 2, height: 8 },
      { x: 18, y: -2, width: 2, height: 11 },
      { x: 30, y: -7, width: 2, height: 6 },
    ]);
    this.game.config.setImageHitboxes("dino-duck2", [
      { x: 3, y: -18, width: 7, height: 5 },
      { x: 10, y: -13, width: 44, height: 11 },
      { x: 13, y: -2, width: 2, height: 11 },
      { x: 22, y: -8, width: 2, height: 5 },
      { x: 30, y: -7, width: 2, height: 6 },
    ]);
    this.game.config.setImageHitboxes("cactus1", [
      { x: 2, y: -13, width: 2, height: 11 },
      { x: 7, y: 0, width: 3, height: 33 },
      { x: 13, y: -17, width: 2, height: 11 },
    ]);
    this.game.config.setImageHitboxes("cactus2", [
      { x: 2, y: -13, width: 2, height: 11 },
      { x: 7, y: 0, width: 3, height: 33 },
      { x: 13, y: -17, width: 2, height: 11 },
      { x: 19, y: -20, width: 2, height: 9 },
      { x: 24, y: 0, width: 3, height: 33 },
      { x: 30, y: -15, width: 2, height: 13 },
    ]);
    this.game.config.setImageHitboxes("cactus3", [
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
    this.game.config.setImageHitboxes("big-cactus1", [
      { x: 2, y: -20, width: 3, height: 16 },
      { x: 10, y: -3, width: 5, height: 45 },
      { x: 20, y: -22, width: 3, height: 16 },
    ]);
    this.game.config.setImageHitboxes("big-cactus2", [
      { x: 2, y: -20, width: 3, height: 16 },
      { x: 10, y: -3, width: 5, height: 45 },
      { x: 20, y: -22, width: 3, height: 16 },
      { x: 27, y: -28, width: 3, height: 15 },
      { x: 35, y: -3, width: 5, height: 45 },
      { x: 45, y: -22, width: 3, height: 16 },
    ]);
    this.game.config.setImageHitboxes("big-cactus3", [
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
    this.game.config.setImageHitboxes("bird1", [
      { x: 6, y: -22, width: 5, height: 4 },
      { x: 11, y: -20, width: 6, height: 9 },
      { x: 18, y: -15, width: 15, height: 7 },
      { x: 21, y: -4, width: 4, height: 11 },
      { x: 25, y: -13, width: 14, height: 6 },
    ]);
    this.game.config.setImageHitboxes("bird2", [
      { x: 3, y: -12, width: 5, height: 4 },
      { x: 8, y: -11, width: 8, height: 8 },
      { x: 16, y: -6, width: 15, height: 8 },
      { x: 18, y: -19, width: 3, height: 5 },
      { x: 19, y: -14, width: 7, height: 5 },
      { x: 22, y: -4, width: 14, height: 5 },
    ]);
  }
}
