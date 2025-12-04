import { SpriteSource } from "@game-object/core";
import { Texture } from "@module/graphics";

import Clip from "./clip";

export default class Animator<ClipName extends string> implements SpriteSource {
  private clips: Record<ClipName, Clip>;
  private currentClip: Clip;

  public constructor(clips: Record<ClipName, Clip>, initialClip: ClipName) {
    this.clips = clips;
    this.currentClip = this.clips[initialClip];
  }

  public play(name: ClipName): void {
    this.currentClip = this.clips[name];
  }

  public update(deltaTime: number): void {
    this.currentClip.update(deltaTime);
  }

  public getTexture(): Texture {
    const frame = this.currentClip.getCurrentFrame();
    return frame.texture;
  }
}
