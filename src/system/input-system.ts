type KeyboardHandler = (event: KeyboardEvent) => void;

export default class InputSystem {
  public onKey?: KeyboardHandler | null;

  public constructor() {
    window.addEventListener("keydown", this.handleInput);
    window.addEventListener("keyup", this.handleInput);
  }

  private handleInput = (event: KeyboardEvent): any => {
    this.onKey?.(event);
    return true;
  };
}
