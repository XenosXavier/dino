import { GameObject } from "@game-object/core";

export default abstract class Component {
  public readonly gameObject: GameObject;

  public constructor(gameObject: GameObject) {
    this.gameObject = gameObject;
  }
}

export type ComponentClass<T extends Component> = new (...args: any) => T;
