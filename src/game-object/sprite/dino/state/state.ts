import Dino, { DinoCommand } from "../dino";

export default abstract class State {
  protected dino: Dino;

  public constructor(dino: Dino) {
    this.dino = dino;
  }

  public enter?(): void;

  public exit?(): void;

  public handleCommand?(command: DinoCommand): void;
}
