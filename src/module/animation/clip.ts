import { Frame } from "./frame";

export default class Clip {
  private readonly totalDuration: number;
  private frames: Frame[];
  private elapsedTime: number;

  public constructor(frames: [Frame, ...Frame[]]) {
    this.frames = frames;
    this.elapsedTime = 0;
    this.totalDuration = this.frames.reduce((total, frame) => {
      return total + frame.duration;
    }, 0);
  }

  public update(deltaTime: number): void {
    this.elapsedTime += deltaTime;
    this.elapsedTime %= this.totalDuration;
  }

  public getCurrentFrame(): Frame {
    let duration = 0;
    const index = this.frames.findIndex((frame) => {
      duration += frame.duration;
      return duration > this.elapsedTime;
    });
    return this.frames[index]!;
  }
}
