export interface Frame {
  key: string;
  image: HTMLImageElement;
}

export default class Animation {
  private readonly frameDuration = 120;
  private frames: Frame[];
  private elapsedTime: number;

  public constructor(frames: [Frame, ...Frame[]]) {
    this.frames = frames;
    this.elapsedTime = 0;
  }

  public update(deltaTime: number): void {
    this.elapsedTime += deltaTime;
    this.elapsedTime %= this.frames.length * this.frameDuration;
  }

  public getFrame(): Frame {
    const index = Math.floor(this.elapsedTime / this.frameDuration);
    return this.frames[index]!;
  }
}
