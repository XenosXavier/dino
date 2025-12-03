import { Curtain, Dino, DinoCommand, Track } from "@game-object/sprite";
import { GameObjectManager } from "@manager";

import { SceneName } from "../game";
import Scene from "./scene";

export default class IdleScene extends Scene {
  private dino!: Dino;
  private tracks!: Track[];
  private curtain!: Curtain;

  public override load(): void {
    this.dino = GameObjectManager.getDino();
    this.tracks = GameObjectManager.getTracks();
    this.curtain = GameObjectManager.getCurtain();
  }

  public override init(): void {
    this.game.inputSystem.onKey = this.handleInput;
    this.dino.onGround = this.startCutscene;
    this.tracks.forEach((track) => track.rigidbody.velocity.set(0, 0));
  }

  public override build(): void {
    this.dino.position.set(0, 150);
    this.tracks[0]?.position.set(0, 150);
    this.tracks[1]?.position.set(this.tracks[1].width, 150);
    this.curtain.position.set(60, 150);
  }

  public override update(deltaTime: number): void {
    if (this.curtain.position.x > 1000) {
      this.game.sceneManager.setScene(SceneName.Play);
      return;
    }

    this.updateGameObjects(deltaTime);
    this.checkCollisions();
    this.renderGameObjects();
  }

  private handleInput = (e: KeyboardEvent): void => {
    if (("Space" === e.code || "ArrowUp" === e.code) && "keydown" === e.type) {
      this.dino.handleCommand(DinoCommand.Jump);
    }
  };

  private startCutscene = (): void => {
    this.game.inputSystem.onKey = null;
    this.dino.onGround = null;
    this.dino.rigidbody.velocity.set(52, 0);
    this.curtain.rigidbody.velocity.set(1000, 0);
  };

  private updateGameObjects(deltaTime: number): void {
    [...this.tracks, this.curtain, this.dino].forEach((gameObject) =>
      gameObject.update(deltaTime),
    );
  }

  private checkCollisions(): void {
    this.game.collisionSystem.checkCollision(
      this.dino,
      this.tracks,
      (dino, track) => dino.handleCollision(track),
    );
  }

  private renderGameObjects(): void {
    this.game.renderSystem.render(
      [...this.tracks, this.curtain, this.dino],
      this.game.canvas,
    );
  }
}
