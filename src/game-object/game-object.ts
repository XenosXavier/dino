import Component, { ComponentClass } from "../component/component";

export default class GameObject {
  private components: Map<ComponentClass<any>, Component>;

  public constructor() {
    this.components = new Map();
  }

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

  public update?(deltaTime: number): void;
}
