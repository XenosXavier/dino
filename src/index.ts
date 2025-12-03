import Game from "./game";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const game = new Game(canvas, 600, 150);
game.start();
