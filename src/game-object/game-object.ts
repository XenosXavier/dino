export default class GameObject {
  public x: number;
  public y: number;

  public constructor() {
    this.x = 0;
    this.y = 0;
  }

  public setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  public update?(deltaTime: number): void;
}
