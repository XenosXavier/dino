import { Texture } from "@module/graphics";

export default class Assets {
  private static textures: Record<string, Texture> = {};
  private static defaultTexture = new Texture(
    "default",
    Assets.createDefaultImage(),
  );

  public static async loadTexture(
    key: string,
    src: string,
    scale: number = 1.0,
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const image = new Image();

      image.onload = () => {
        resolve(this.addTexture(key, image, scale));
      };

      image.onerror = (error) => {
        reject(error);
      };

      image.src = src;
    });
  }

  public static addTexture(
    key: string,
    image: HTMLImageElement,
    scale: number = 1.0,
  ): void {
    image.width *= scale;
    image.height *= scale;
    Assets.textures[key] = new Texture(key, image);
  }

  public static getTexture(key: string): Texture {
    return Assets.textures[key] ?? Assets.defaultTexture;
  }

  private static createDefaultImage(): HTMLImageElement {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    const image = new Image();
    image.src = canvas.toDataURL("image/png");
    return image;
  }
}
