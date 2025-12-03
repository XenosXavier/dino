import { Renderer, RenderingMode } from "@component/rendering";
import { GameObject } from "@game-object/core";
import { Texture } from "@module/graphics";

export interface SpriteSource {
  getTexture(): Texture;
}

export default class Sprite extends GameObject {
  protected readonly source: SpriteSource;
  protected readonly renderer: Renderer;

  public constructor(source: SpriteSource) {
    super();
    this.source = source;
    this.addComponent((this.renderer = this.createRenderer()));
  }

  public get texture(): Texture {
    return this.source.getTexture();
  }

  public get width(): number {
    return this.texture.image.width;
  }

  public get height(): number {
    return this.texture.image.height;
  }

  private createRenderer(): Renderer {
    return new Renderer(this, RenderingMode.Sprite);
  }
}
