const PI = Math.PI;
const PI2 = PI * 2;
const HALF_PI = PI / 2;
const QUART_PI = PI / 4;
const TENTH_PI = PI / 10;
const TWENTIETH_PI = PI / 20;

/**
 *
 * @param x 0 => 1
 * @param y
 * @param width example => 300
 * @param height
 *
 */
function coordinateRatioToScreen(
  x: number,
  y: number,
  width: number,
  height: number
): { x: number; y: number } {
  return {
    x: Math.round(width * x),
    y: Math.round(height * y),
  };
}

/**
 *
 * @param point nombre de point qui seront converties en valeur
 * @param scalePoint échelle de grandeur de points à avoir pour atteindre le cap maximum
 * @param capMax
 * @param minVal minimum value
 */
function scaleHyperTangent(
  point: number,
  scalePoint: number,
  capMax: number,
  minVal: number = 0
): number {
  return Math.tanh(((point + minVal) / scalePoint) * capMax);
}

function angleRangeLoop(angle: number): number {
  return rangeLoop(-PI2, angle, PI2);
}

function clamp(min: number, n: number, max: number): number {
  return Math.min(Math.max(n, min), max);
}

function rangeLoop(min: number, n: number, max: number): number {
  if (max < 0) {
    return n > max ? (max % n) + min : n < min ? (min - n + max) % max : n;
  }
  return n > max ? (n % max) + min : n < min ? (n - min + max) % max : n;
}

export const NumberUtils = {
  rangeLoop,
  clamp: clamp,
  angleRangeLoop,
  scaleHyperTangent,
  coordinateRatioToScreen,
  TWENTIETH_PI,
  TENTH_PI,
  QUART_PI,
  HALF_PI,
  PI2,
  PI,
};
