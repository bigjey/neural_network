import { Perceptron, W, H } from './SimplePerceptron.js';
import { Point, F } from './Point.js';
import { rand } from './utils.js';
let canvas;
let ctx;
let points;
let currentPoint = 0;
const network = new Perceptron(3, 0.005);
function init() {
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = W;
    canvas.height = H;
    document.body.appendChild(canvas);
}
function main() {
    points = [];
    for (let i = 0; i < 50; i++) {
        points.push(new Point(rand(-W / 2, W / 2), rand(-W / 2, W / 2)));
    }
    canvas.addEventListener('click', trainDot);
}
function trainDot(e) {
    const x = e.clientX - W / 2;
    const y = e.clientY - W / 2;
    const p = new Point(x, y);
    const inputs = [x, y, 1];
    network.train(inputs, y >= F(x) ? 1 : -1);
    points.push(p);
}
function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.save();
    ctx.translate(W / 2, H / 2);
    let p1 = new Point(-W / 2, F(-W / 2));
    let p2 = new Point(W / 2, F(W / 2));
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.closePath();
    ctx.strokeStyle = '#000';
    ctx.stroke();
    let p3 = new Point(-W / 2, network.guessY(-W / 2));
    let p4 = new Point(W / 2, network.guessY(W / 2));
    ctx.beginPath();
    ctx.moveTo(p3.x, p3.y);
    ctx.lineTo(p4.x, p4.y);
    ctx.closePath();
    ctx.strokeStyle = 'red';
    ctx.stroke();
    let p = points[currentPoint];
    let inputs = [p.x, p.y, p.b];
    network.train(inputs, p.target);
    // console.log(p);
    currentPoint = (currentPoint + 1) % points.length;
    ctx.strokeStyle = '#000';
    points.forEach((p) => {
        p.draw(ctx);
        let inputs = [p.x, p.y, p.b];
        if (network.guess(inputs) === p.target) {
            ctx.fillStyle = 'green';
        }
        else {
            ctx.fillStyle = 'red';
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
draw();
setInterval(draw, 1000 / 60);
//# sourceMappingURL=simple.js.map