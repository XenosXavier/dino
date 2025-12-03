import { TextStyle } from "@type/ui";

export default class Canvas {
  private element: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  public constructor(
    element: HTMLCanvasElement,
    width: number,
    height: number,
  ) {
    element.width = width;
    element.height = height;
    this.element = element;
    this.context = this.element.getContext("2d")!;
  }

  public get width(): number {
    return this.element.width;
  }

  public get height(): number {
    return this.element.height;
  }

  public clear(): void {
    this.context.clearRect(0, 0, this.element.width, this.element.height);
  }

  public drawImage(
    image: HTMLImageElement,
    x: number,
    y: number,
    width: number,
    height: number,
  ): void {
    this.context.drawImage(image, x, y, width, height);
  }

  public drawText(text: string, style: TextStyle, x: number, y: number): void {
    this.context.font = style.font;
    this.context.fillStyle = style.color;
    this.context.textAlign = style.align;
    this.context.fillText(text, x, y);
  }
}
