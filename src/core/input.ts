type keyboardHandler = (event: KeyboardEvent) => void;

export default class Input {
  public onKey?: keyboardHandler | null;

  public constructor() {
    window.addEventListener("keydown", this.handleInput);
    window.addEventListener("keyup", this.handleInput);
  }

  private handleInput = (event: KeyboardEvent): any => {
    this.onKey?.(event);
    return true;
  };
}
