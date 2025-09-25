export default class Animation {
  private readonly frameDuration = 120;
  private frames: HTMLImageElement[];
  private elapsedTime: number;

  public constructor(frames: [HTMLImageElement, ...HTMLImageElement[]]) {
    this.frames = frames;
    this.elapsedTime = 0;
  }

  public update(deltaTime: number): void {
    this.elapsedTime += deltaTime;
    this.elapsedTime %= this.frames.length * this.frameDuration;
  }

  public getFrame(): HTMLImageElement {
    const index = Math.floor(this.elapsedTime / this.frameDuration);
    return this.frames[index]!;
  }
}
