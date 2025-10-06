import Component, { ComponentClass } from "../component/component";

export default class GameObject {
  private components: Map<ComponentClass<any>, Component>;
  public x: number;
  public y: number;

  public constructor() {
    this.components = new Map();
    this.x = 0;
    this.y = 0;
  }

  public setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  public update?(deltaTime: number): void;

  public addComponent<T extends Component>(component: T): void {
    this.components.set(component.constructor as ComponentClass<T>, component);
  }

  public getComponent<T extends Component>(
    componentClass: ComponentClass<T>
  ): T | undefined {
    return this.components.get(componentClass) as T | undefined;
  }

  public hasComponent<T extends Component>(
    componentClass: ComponentClass<T>
  ): boolean {
    return this.components.has(componentClass);
  }
}
