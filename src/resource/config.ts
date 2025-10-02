import { Rect } from "../types/geometry";

export default class Config {
  private imageHitboxes: Record<string, Rect[]>;

  public constructor() {
    this.imageHitboxes = {};
  }

  public setImageHitboxes(key: string, hitboxes: Rect[]): void {
    this.imageHitboxes[key] = hitboxes;
  }

  public getImageHitboxes(key: string): Rect[] {
    return this.imageHitboxes[key] ?? [];
  }
}
