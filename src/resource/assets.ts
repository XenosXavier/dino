export default class Assets {
  private images: Record<string, HTMLImageElement>;
  private defaultImage: HTMLImageElement;

  public constructor() {
    this.images = {};
    this.defaultImage = this.createDefaultImage();
  }

  private createDefaultImage(): HTMLImageElement {
    const image = new Image();
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    image.src = canvas.toDataURL("image/png");
    return image;
  }

  public async loadImage(
    key: string,
    src: string,
    scale: number = 1.0
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const image = new Image();

      image.onload = () => {
        resolve(this.addImage(key, image, scale));
      };

      image.onerror = (error) => {
        reject(error);
      };

      image.src = src;
    });
  }

  public addImage(
    key: string,
    image: HTMLImageElement,
    scale: number = 1.0
  ): void {
    image.width *= scale;
    image.height *= scale;
    this.images[key] = image;
  }

  public getImage(key: string): HTMLImageElement {
    return this.images[key] ?? this.defaultImage;
  }
}
