import { Perceptron } from './Perceptron.js';
import { randInt } from './utils.js';
import { Matrix } from './matrix.js';
const W = 600;
const H = 600;
const SIZE = 10;
let canvas;
let ctx;
const network = new Perceptron(2, 4, 1, 0.05);
const trainingData = [
    {
        inputs: Matrix.from([[1], [0]]),
        targets: Matrix.from([[1]])
    },
    {
        inputs: Matrix.from([[0], [1]]),
        targets: Matrix.from([[1]])
    },
    {
        inputs: Matrix.from([[1], [1]]),
        targets: Matrix.from([[0]])
    },
    {
        inputs: Matrix.from([[0], [0]]),
        targets: Matrix.from([[0]])
    }
];
const rows = H / SIZE;
const cols = W / SIZE;
function init() {
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = W;
    canvas.height = H;
    document.body.appendChild(canvas);
}
function draw() {
    train(1000);
    ctx.clearRect(0, 0, W, H);
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            let prediction = network.feedforward(Matrix.from([[y / rows], [x / cols]]));
            let color = prediction.values[0][0] * 255;
            ctx.fillStyle = `rgb(${color}, ${color}, ${color})`;
            ctx.fillRect(x * SIZE, y * SIZE, SIZE, SIZE);
        }
    }
    requestAnimationFrame(draw);
}
function train(times = 1000) {
    for (var i = 0; i < times; i++) {
        let j = randInt(0, trainingData.length - 1);
        let data = trainingData[j];
        network.train(data.inputs, data.targets);
    }
}
init();
draw();
//# sourceMappingURL=xor.js.map