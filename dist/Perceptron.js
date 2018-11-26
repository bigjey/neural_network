import { rand, sigmoid, sigmoidPrime } from './utils.js';
import { Matrix } from './matrix.js';
var Perceptron = /** @class */ (function () {
    function Perceptron(input, hidden, output, learningRate) {
        if (learningRate === void 0) { learningRate = 0.1; }
        this.input = input;
        this.hidden = hidden;
        this.output = output;
        this.learningRate = learningRate;
        this.hiddenWeights = new Matrix(hidden, input);
        this.hiddenWeights = Matrix.map(this.hiddenWeights, function (v) { return rand(-1, 1); });
        this.hiddenBias = new Matrix(hidden, 1);
        this.hiddenBias = Matrix.map(this.hiddenBias, function () { return rand(-1, 1); });
        this.outputWeights = new Matrix(output, hidden);
        this.outputWeights = Matrix.map(this.outputWeights, function (v) { return rand(-1, 1); });
        this.outputBias = new Matrix(output, 1);
        this.outputBias = Matrix.map(this.outputBias, function () { return rand(-1, 1); });
    }
    Perceptron.prototype.feedforward = function (inputs) {
        var H = Matrix.product(this.hiddenWeights, inputs);
        H = Matrix.add(H, this.hiddenBias);
        H = Matrix.map(H, sigmoid);
        var O = Matrix.product(this.outputWeights, H);
        O = Matrix.add(O, this.outputBias);
        O = Matrix.map(O, sigmoid);
        return O;
    };
    Perceptron.prototype.train = function (inputs, targets) {
        var H = Matrix.product(this.hiddenWeights, inputs);
        H = Matrix.add(H, this.hiddenBias);
        H = Matrix.map(H, sigmoid);
        var O = Matrix.product(this.outputWeights, H);
        O = Matrix.add(O, this.outputBias);
        O = Matrix.map(O, sigmoid);
        var OE = Matrix.subtract(targets, O);
        var HE = Matrix.product(Matrix.transpose(this.outputWeights), OE);
        var OG = Matrix.multiply(OE, Matrix.map(O, sigmoidPrime));
        OG = Matrix.multiply(OG, this.learningRate);
        var OD = Matrix.product(OG, Matrix.transpose(H));
        this.outputWeights = Matrix.add(this.outputWeights, OD);
        this.outputBias = Matrix.add(this.outputBias, OG);
        var HG = Matrix.multiply(HE, Matrix.map(H, sigmoidPrime));
        HG = Matrix.multiply(HG, this.learningRate);
        var HD = Matrix.product(HG, Matrix.transpose(inputs));
        this.hiddenWeights = Matrix.add(this.hiddenWeights, HD);
        this.hiddenBias = Matrix.add(this.hiddenBias, HG);
    };
    return Perceptron;
}());
export { Perceptron };
//# sourceMappingURL=Perceptron.js.map