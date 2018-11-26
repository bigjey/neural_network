import { Perceptron } from './Perceptron.js';
import { randInt } from './utils.js';
import { Matrix } from './matrix.js';
var W = 600;
var H = 600;
var SIZE = 10;
var canvas;
var ctx;
var network = new Perceptron(2, 4, 1, 0.05);
var trainingData = [
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
var rows = H / SIZE;
var cols = W / SIZE;
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
    for (var y = 0; y < rows; y++) {
        for (var x = 0; x < cols; x++) {
            var prediction = network.feedforward(Matrix.from([[y / rows], [x / cols]]));
            var color = prediction.values[0][0] * 255;
            ctx.fillStyle = "rgb(" + color + ", " + color + ", " + color + ")";
            ctx.fillRect(x * SIZE, y * SIZE, SIZE, SIZE);
        }
    }
    requestAnimationFrame(draw);
}
function train(times) {
    if (times === void 0) { times = 1000; }
    for (var i = 0; i < times; i++) {
        var j = randInt(0, trainingData.length - 1);
        var data = trainingData[j];
        network.train(data.inputs, data.targets);
    }
}
init();
draw();
//# sourceMappingURL=xor.js.map