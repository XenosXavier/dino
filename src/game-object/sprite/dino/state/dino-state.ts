import Collider from "../../../../component/collider";
import { State } from "../../../../component/state-machine";
import Dino, { Command } from "../dino";

export default abstract class DinoState implements State {
  protected dino: Dino;

  public constructor(dino: Dino) {
    this.dino = dino;
  }

  public enter?(): void;

  public exit?(): void;

  public update?(deltaTime: number): void;

  public handleCommand?(command: Command): void;

  public handleCollision?(other: Collider): void;
}
