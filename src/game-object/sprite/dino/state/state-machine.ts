import State from "./state";

export default class StateMachine<StateName extends string> {
  private states: Record<StateName, State>;
  private currentState!: State;

  public constructor(
    states: Record<StateName, State>,
    initialState: StateName,
  ) {
    this.states = states;
    this.setState(initialState);
  }

  public getCurrentState(): State {
    return this.currentState;
  }

  public setState(name: StateName): void {
    this.currentState?.exit?.();
    this.currentState = this.states[name];
    this.currentState.enter?.();
  }
}
