import { rand } from './utils.js';
export const W = 600;
export const H = 600;
export class Perceptron {
    constructor(numberOfWeights, learningRate = 0.1) {
        this.learningRate = learningRate;
        this.weights = new Array(numberOfWeights);
        for (var i = 0; i < numberOfWeights; i++) {
            this.weights[i] = rand(-W / 2, W / 2);
        }
    }
    sum(inputs) {
        let s = 0;
        inputs.forEach((input, i) => (s += input * this.weights[i]));
        return s;
    }
    activate(n) {
        return n >= 0 ? 1 : -1;
    }
    guess(inputs) {
        let sum = this.sum(inputs);
        return this.activate(sum);
    }
    // w0 * x + w1 * y + w2 = 0
    // y = -w2/w1 - w0*x/w1
    guessY(x) {
        let [w0, w1, w2] = this.weights;
        return -w2 / w1 - (w0 * x) / w1;
    }
    train(inputs, target) {
        let error = this.error(inputs, target);
        this.weights.forEach((w, i) => {
            this.weights[i] += error * inputs[i] * this.learningRate;
        });
    }
    error(inputs, target) {
        return target - this.guess(inputs);
    }
}
//# sourceMappingURL=SimplePerceptron.js.map