import { SceneName } from "../core/game";
import Scene from "./scene";

export default class LoadScene extends Scene {
  public override load(): void {
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

    Promise.all(promises).then(() => {
      this.game.setScene(SceneName.Idle);
    });
  }
}
