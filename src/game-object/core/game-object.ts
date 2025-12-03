import { Component, ComponentClass } from "@component/core";
import { Vector2 } from "@module/math";

export default abstract class GameObject {
  public readonly position: Vector2;
  protected components: Map<ComponentClass<any>, Component>;

  public constructor() {
    this.position = new Vector2();
    this.components = new Map();
  }

  public addComponent<T extends Component>(component: T): void {
    this.components.set(component.constructor as ComponentClass<T>, component);
  }

  public getComponent<T extends Component>(
    componentClass: ComponentClass<T>,
  ): T | undefined {
    return this.components.get(componentClass) as T | undefined;
  }

  public update?(deltaTime: number): void;
}
