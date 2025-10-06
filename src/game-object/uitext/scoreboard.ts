import { Align } from "../../types/uitext";
import UIText from "./uitext";

export default class Scoreboard extends UIText {
  private currentScore: number;
  private highestScore: number;

  public constructor() {
    super({
      font: '12px "Press Start 2P"',
      color: "#535353",
      align: Align.Right,
    });
    this.currentScore = 0;
    this.highestScore = 0;
  }

  public resetCurrentScore(): void {
    this.currentScore = 0;
  }

  public updateHighestScore(): void {
    this.highestScore = Math.max(this.highestScore, this.currentScore);
  }

  public override update(deltaTime: number): void {
    this.currentScore += deltaTime / 100;
  }

  public override get text(): string {
    let content = this.formatScore(this.currentScore);

    if (this.highestScore > 0) {
      content = `HI ${this.formatScore(this.highestScore)} ${content}`;
    }

    return content;
  }

  public getCurrentScore(): number {
    return this.currentScore;
  }

  private formatScore(score: number): string {
    return Math.floor(score).toString().padStart(5, "0");
  }
}
