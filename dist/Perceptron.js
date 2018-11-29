import { rand, sigmoid, sigmoidPrime } from './utils.js';
import { Matrix } from './matrix.js';
export class Perceptron {
    constructor(input, hidden, output, learningRate = 0.1) {
        this.input = input;
        this.hidden = hidden;
        this.output = output;
        this.learningRate = learningRate;
        this.hiddenWeights = new Matrix(hidden, input);
        this.hiddenWeights = Matrix.map(this.hiddenWeights, (v) => rand(-1, 1));
        this.hiddenBias = new Matrix(hidden, 1);
        this.hiddenBias = Matrix.map(this.hiddenBias, () => rand(-1, 1));
        this.outputWeights = new Matrix(output, hidden);
        this.outputWeights = Matrix.map(this.outputWeights, (v) => rand(-1, 1));
        this.outputBias = new Matrix(output, 1);
        this.outputBias = Matrix.map(this.outputBias, () => rand(-1, 1));
    }
    feedforward(inputs) {
        let H = Matrix.product(this.hiddenWeights, inputs);
        H = Matrix.add(H, this.hiddenBias);
        H = Matrix.map(H, sigmoid);
        let O = Matrix.product(this.outputWeights, H);
        O = Matrix.add(O, this.outputBias);
        O = Matrix.map(O, sigmoid);
        return O;
    }
    train(inputs, targets) {
        let H = Matrix.product(this.hiddenWeights, inputs);
        H = Matrix.add(H, this.hiddenBias);
        H = Matrix.map(H, sigmoid);
        let O = Matrix.product(this.outputWeights, H);
        O = Matrix.add(O, this.outputBias);
        O = Matrix.map(O, sigmoid);
        let OE = Matrix.subtract(targets, O);
        let HE = Matrix.product(Matrix.transpose(this.outputWeights), OE);
        let OG = Matrix.multiply(OE, Matrix.map(O, sigmoidPrime));
        OG = Matrix.multiply(OG, this.learningRate);
        let OD = Matrix.product(OG, Matrix.transpose(H));
        this.outputWeights = Matrix.add(this.outputWeights, OD);
        this.outputBias = Matrix.add(this.outputBias, OG);
        let HG = Matrix.multiply(HE, Matrix.map(H, sigmoidPrime));
        HG = Matrix.multiply(HG, this.learningRate);
        let HD = Matrix.product(HG, Matrix.transpose(inputs));
        this.hiddenWeights = Matrix.add(this.hiddenWeights, HD);
        this.hiddenBias = Matrix.add(this.hiddenBias, HG);
    }
}
//# sourceMappingURL=Perceptron.js.map