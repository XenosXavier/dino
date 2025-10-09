import Component from "./component";

export default class Position implements Component {
  public x: number;
  public y: number;

  public constructor() {
    this.x = 0;
    this.y = 0;
  }

  public set(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  public move(dx: number, dy: number): void {
    this.x += dx;
    this.y += dy;
  }
}
