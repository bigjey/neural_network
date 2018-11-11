export function rand(min: number, max: number = 0) {
  if (arguments.length < 2) {
    max = min;
    min = 0;
  }

  return Math.random() * (max - min) + min;
}

export function randInt(min: number, max: number = 0) {
  if (arguments.length < 2) {
    max = min;
    min = 0;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function mapValue(
  value: number,
  originMin: number,
  originMax: number,
  targetMin: number,
  targetMax: number
): number {
  let originRange = originMax - originMin;
  let targetRange = targetMax - targetMin;
  let share = (value - originMin) / originRange;

  return share * targetRange + targetMin;
}

export function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x));
}
