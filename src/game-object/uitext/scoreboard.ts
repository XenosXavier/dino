import { UIText } from "@game-object/core";
import { TextAlign } from "@type/ui";

export default class Scoreboard extends UIText {
  private currentScore: number;
  private highestScore: number;

  public constructor() {
    super("00000", {
      font: '12px "Press Start 2P',
      color: "#535353",
      align: TextAlign.Right,
    });
    this.currentScore = 0;
    this.highestScore = 0;
  }

  public getCurrentScore(): number {
    return this.currentScore;
  }

  public resetCurrentScore(): void {
    this.currentScore = 0;
  }

  public updateHighestScore(): void {
    this.highestScore = Math.max(this.highestScore, this.currentScore);
    this.text = this.formatText();
  }

  public override update(deltaTime: number): void {
    this.currentScore += deltaTime / 100;
    this.text = this.formatText();
  }

  private formatText(): string {
    let text = this.formatScore(this.currentScore);

    if (this.highestScore > 0) {
      text = `HI ${this.formatScore(this.highestScore)} ${text}`;
    }

    return text;
  }

  private formatScore(score: number): string {
    return Math.floor(score).toString().padStart(5, "0");
  }
}
