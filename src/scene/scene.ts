import Game from "../game";

export default abstract class Scene {
  protected game: Game;

  public constructor(game: Game) {
    this.game = game;
  }

  public load?(): void;

  public init?(): void;

  public build?(): void;

  public update?(deltaTime: number): void;
}
