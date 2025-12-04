import { Rect } from "@type/geometry";

export default class Config {
  private static textureHitboxes: Record<string, Rect[]> = {};

  public static setTextureHitboxes(key: string, hitboxes: Rect[]): void {
    Config.textureHitboxes[key] = hitboxes;
  }

  public static getTextureHitboxes(key: string): Rect[] {
    return Config.textureHitboxes[key] ?? [];
  }
}
