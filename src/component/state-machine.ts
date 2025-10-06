import Component from "./component";

export interface State {
  enter?(): void;
  exit?(): void;
}

export default class StateMachine<T extends string, S extends State>
  implements Component
{
  private states: Record<T, S>;
  private state!: S;

  public constructor(states: Record<T, S>, initialKey: T) {
    this.states = states;
    this.setState(initialKey);
  }

  public setState(key: T): void {
    this.state?.exit?.();
    this.state = this.states[key];
    this.state.enter?.();
  }

  public getState(): S {
    return this.state;
  }
}
