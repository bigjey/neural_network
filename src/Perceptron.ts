import { rand, sigmoid } from "./utils.js";
import { W } from "./constants.js";
import { Matrix } from "./matrix.js";

export type Weighs = Matrix[];

export class Perceptron {
  weights: Weighs;
  bias: Matrix[];
  layers: number[];
  steps: number;

  learningRate: number;

  constructor(layers: number[], learningRate: number = 0.1) {
    this.layers = layers;
    this.steps = this.layers.length - 1;
    this.learningRate = learningRate;

    this.weights = new Array(this.steps);
    this.bias = new Array(this.steps);

    for (var i = 0; i < this.steps; i++) {
      this.weights[i] = new Matrix(this.layers[i + 1], this.layers[i]);
      this.weights[i] = Matrix.map(this.weights[i], () => rand(-1, 1));

      this.bias[i] = new Matrix(this.layers[i + 1], 1);
      this.bias[i] = Matrix.map(this.bias[i], () => rand(-1, 1));
    }

    console.log(this);
  }

  feedforward(inputs: Matrix): Matrix {
    // Generating the Hidden Outputs
    let hidden = Matrix.multiply(this.weights[0], inputs);
    hidden = Matrix.add(hidden, this.bias[0]);
    // activation function!
    hidden = Matrix.map(hidden, sigmoid);

    // Generating the output's output!
    let output = Matrix.multiply(this.weights[1], hidden);
    output = Matrix.add(output, this.bias[1]);
    output = Matrix.map(output, sigmoid);

    return output;
  }

  train(inputs: Matrix, targets: Matrix) {
    // Generating the Hidden Outputs
    let hidden = Matrix.multiply(this.weights[0], inputs);
    hidden = Matrix.add(hidden, this.bias[0]);
    // activation function!
    hidden = Matrix.map(hidden, sigmoid);

    // Generating the output's output!
    let outputs = Matrix.multiply(this.weights[1], hidden);
    outputs = Matrix.add(outputs, this.bias[1]);
    outputs = Matrix.map(outputs, sigmoid);

    // Convert array to matrix object

    let output_errors = Matrix.subtract(outputs, targets);

    let gradients = Matrix.map(outputs, (x) => x * (1 - x));
    gradients = Matrix.multiply(gradients, output_errors);
    gradients = Matrix.multiply(gradients, this.learningRate);

    let hidden_T = Matrix.transpose(hidden);
    let weight_ho_deltas = Matrix.product(gradients, hidden_T);

    this.weights[1] = Matrix.add(this.weights[1], weight_ho_deltas);
    this.bias[1] = Matrix.add(this.bias[1], gradients);

    let who_t = Matrix.transpose(this.weights[1]);
    let hidden_errors = Matrix.product(who_t, output_errors);

    // Calculate hidden gradient
    let hidden_gradient = Matrix.map(hidden, (x) => x * (1 - x));
    hidden_gradient = Matrix.multiply(hidden_gradient, hidden_errors);
    hidden_gradient = Matrix.multiply(hidden_gradient, this.learningRate);

    // Calcuate input->hidden deltas
    let inputs_T = Matrix.transpose(inputs);
    let weight_ih_deltas = Matrix.product(hidden_gradient, inputs_T);

    this.weights[0] = Matrix.add(this.weights[0], weight_ih_deltas);
    // Adjust the bias by its deltas (which is just the gradients)
    this.bias[0] = Matrix.add(this.bias[0], hidden_gradient);

    // console.log(outputs);

    // let T = target;
    // let O = outputs[outputs.length - 1];
    // let E: Matrix[] = [Matrix.subtract(T, O)];

    // for (var i = this.steps - 1; i > 0; i--) {
    //   let WT = Matrix.transpose(this.weights[this.steps - i]);
    //   E.unshift(Matrix.product(WT, E[0]));
    // }

    // for (var i = E.length - 1; i >= 0; i--) {
    //   console.log("correcting");
    //   let I = outputs[i];

    //   let D = Matrix.multiply(E[i], this.learningRate);
    //   let O = Matrix.map(outputs[i + 1], (x) => x * (1 - x));
    //   D = Matrix.multiply(D, O);

    //   let B = this.bias[i];
    //   this.bias[i] = Matrix.add(B, D);

    //   D = Matrix.product(D, Matrix.transpose(I));

    //   let W = this.weights[i];
    //   this.weights[i] = Matrix.add(W, D);
    // }
  }
}
