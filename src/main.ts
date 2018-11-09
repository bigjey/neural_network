import { Perceptron, Inputs } from "./Perceptron.js";
import { Point } from "./Point.js";
import { rand } from "./utils.js";
import { W, H, F } from "./constants.js";

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

const network = new Perceptron(3, 0.005);

let points: Point[];
let currentPoint = 0;

function init(): void {
  canvas = document.createElement("canvas");
  ctx = <CanvasRenderingContext2D>canvas.getContext("2d");

  canvas.width = W;
  canvas.height = H;

  document.body.appendChild(canvas);
}

function main(): void {
  points = new Array(100);

  for (let i = 0; i < points.length; i++) {
    points[i] = new Point(rand(-W / 2, W / 2), rand(-W / 2, W / 2));
  }
}

function draw(): void {
  ctx.clearRect(0, 0, W, H);

  ctx.save();
  ctx.translate(W / 2, H / 2);

  let p1 = new Point(-W / 2, F(-W / 2));
  let p2 = new Point(W / 2, F(W / 2));

  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();

  let p3 = new Point(-W / 2, network.guessY(-W / 2));
  let p4 = new Point(W / 2, network.guessY(W / 2));

  ctx.moveTo(p3.x, p3.y);
  ctx.lineTo(p4.x, p4.y);
  ctx.stroke();

  let p = points[currentPoint];

  let inputs: Inputs = [p.x, p.y, p.b];

  network.train(inputs, p.target);

  currentPoint = (currentPoint + 1) % points.length;

  points.forEach((p) => {
    p.draw(ctx);

    let inputs: Inputs = [p.x, p.y, p.b];

    if (network.guess(inputs) === p.target) {
      ctx.fillStyle = "green";
    } else {
      ctx.fillStyle = "red";
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  });

  ctx.restore();
}

init();
main();

setInterval(draw, 1000 / 60);
