import { rand } from "./utils.js";
import { W } from "./constants.js";

export type Weighs = number[];
export type Inputs = number[];

export class Perceptron {
  weights: Weighs;

  learningRate: number;

  constructor(numberOfWeights: number, learningRate: number = 0.1) {
    this.learningRate = learningRate;

    this.weights = new Array(numberOfWeights);
    for (var i = 0; i < numberOfWeights; i++) {
      this.weights[i] = rand(-W / 2, W / 2);
    }
  }

  sum(inputs: Inputs): number {
    let s: number = 0;

    inputs.forEach((input, i) => (s += input * this.weights[i]));

    return s;
  }

  activate(n: number): number {
    return n >= 0 ? 1 : -1;
  }

  guess(inputs: Inputs): number {
    let sum = this.sum(inputs);

    return this.activate(sum);
  }

  // w0 * x + w1 * y + w2 = 0
  // y = -w2/w1 - w0*x/w1
  guessY(x: number): number {
    let [w0, w1, w2] = this.weights;

    return -w2 / w1 - (w0 * x) / w1;
  }

  train(inputs: Inputs, target: number): void {
    let error = this.error(inputs, target);

    this.weights.forEach((w, i) => {
      this.weights[i] += error * inputs[i] * this.learningRate;
    });
  }

  error(inputs: Inputs, target: number): number {
    return target - this.guess(inputs);
  }
}
