import { rand } from "./utils.js";
import { W } from "./constants.js";
var Perceptron = /** @class */ (function () {
    function Perceptron(numberOfWeights, learningRate) {
        if (learningRate === void 0) { learningRate = 0.1; }
        this.learningRate = learningRate;
        this.weights = new Array(numberOfWeights);
        for (var i = 0; i < numberOfWeights; i++) {
            this.weights[i] = rand(-W / 2, W / 2);
        }
    }
    Perceptron.prototype.sum = function (inputs) {
        var _this = this;
        var s = 0;
        inputs.forEach(function (input, i) { return (s += input * _this.weights[i]); });
        return s;
    };
    Perceptron.prototype.activate = function (n) {
        return n >= 0 ? 1 : -1;
    };
    Perceptron.prototype.guess = function (inputs) {
        var sum = this.sum(inputs);
        return this.activate(sum);
    };
    // w0 * x + w1 * y + w2 = 0
    // y = -w2/w1 - w0*x/w1
    Perceptron.prototype.guessY = function (x) {
        var _a = this.weights, w0 = _a[0], w1 = _a[1], w2 = _a[2];
        return -w2 / w1 - (w0 * x) / w1;
    };
    Perceptron.prototype.train = function (inputs, target) {
        var _this = this;
        var error = this.error(inputs, target);
        this.weights.forEach(function (w, i) {
            _this.weights[i] += error * inputs[i] * _this.learningRate;
        });
    };
    Perceptron.prototype.error = function (inputs, target) {
        return target - this.guess(inputs);
    };
    return Perceptron;
}());
export { Perceptron };
//# sourceMappingURL=Perceptron.js.map