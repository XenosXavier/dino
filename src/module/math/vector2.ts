export default class Vector2 {
  public x: number;
  public y: number;

  public constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  public set(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  public add(x: number, y: number): void {
    this.x += x;
    this.y += y;
  }
}
