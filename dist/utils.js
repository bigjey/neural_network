export function rand(min, max) {
    if (max === void 0) { max = 0; }
    if (arguments.length < 2) {
        max = min;
        min = 0;
    }
    return Math.random() * (max - min) + min;
}
export function randInt(min, max) {
    if (max === void 0) { max = 0; }
    if (arguments.length < 2) {
        max = min;
        min = 0;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function mapValue(value, originMin, originMax, targetMin, targetMax) {
    var originRange = originMax - originMin;
    var targetRange = targetMax - targetMin;
    var share = (value - originMin) / originRange;
    return share * targetRange + targetMin;
}
export function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}
export function sigmoidPrime(x) {
    return x * (1 - x);
}
//# sourceMappingURL=utils.js.map