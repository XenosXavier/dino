import { SceneName } from "../core/game";
import Dino, { Command } from "../game-object/sprite/dino/dino";
import Track from "../game-object/sprite/ground/track";
import Cactus from "../game-object/sprite/obstacle/cactus";
import Curtain from "../game-object/sprite/ui/curtain";
import Scene from "./scene";

export default class IdleScene extends Scene {
  private dino!: Dino;
  private tracks!: Track[];
  private curtain!: Curtain;

  public override load(): void {
    this.dino = this.game.pool.get(
      "dino",
      () => new Dino(this.game.assets, this.game.config)
    );
    this.tracks = this.game.pool.get("tracks", () => [
      new Track(this.game.assets),
      new Track(this.game.assets),
    ]);
    this.curtain = this.game.pool.get("curtain", () => new Curtain(540, 150));
  }

  public override init(): void {
    this.game.inputSystem.onKey = this.handleInput;
    this.dino.onGround = this.transition;
    this.tracks.forEach((track) => track.rigidbody.setVelocity(0, 0));
  }

  public override build(): void {
    this.dino.setPosition(0, 150);
    this.tracks[0]?.setPosition(0, 150);
    this.tracks[1]?.setPosition(this.tracks[1]?.width, 150);
    this.curtain.setPosition(60, 150);
  }

  public override update(deltaTime: number): void {
    if (this.curtain.x > 1000) {
      this.game.setScene(SceneName.Play);
      return;
    }

    this.updateGameObjects(deltaTime);
    this.checkGameObjectCollision();
    this.renderGameObjects();
  }

  private updateGameObjects(deltaTime: number): void {
    [...this.tracks, this.curtain, this.dino].forEach((gameObject) =>
      gameObject.update(deltaTime)
    );
  }

  private checkGameObjectCollision(): void {
    this.game.collisionSystem.checkCollision(
      this.dino,
      this.tracks,
      (dino, gameObject) => {
        dino.handleCollision(gameObject);
      }
    );
  }

  private renderGameObjects(): void {
    this.game.renderSystem.render([...this.tracks, this.curtain, this.dino]);
  }

  private handleInput = (e: KeyboardEvent): void => {
    if ((e.code === "Space" || e.code === "ArrowUp") && e.type === "keydown") {
      this.dino.handleCommand(Command.Jump);
    }
  };

  private transition = (): void => {
    this.game.inputSystem.onKey = null;
    this.dino.rigidbody.setVelocity(52, 0);
    this.curtain.rigidbody.setVelocity(1000, 0);
  };
}
