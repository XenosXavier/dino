import Animation, { Frame } from "./animation";
import Component from "./component";

export default class Animator<T extends string> implements Component {
  private animations: Record<T, Animation>;
  private animation: Animation;

  public constructor(animations: Record<T, Animation>, initialKey: T) {
    this.animations = animations;
    this.animation = animations[initialKey];
  }

  public play(key: T): void {
    this.animation = this.animations[key];
  }

  public update(deltaTime: number): void {
    this.animation.update(deltaTime);
  }

  public getFrame(): Frame {
    return this.animation.getFrame();
  }
}
