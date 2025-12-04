import { Texture } from "@module/graphics";

export interface Frame {
  readonly texture: Texture;
  readonly duration: number;
}
