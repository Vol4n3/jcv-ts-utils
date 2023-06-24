export module NumberUtils {
  export function lerp(t: number, a: number, b: number): number {
    return a + t * (b - a);
  }
  export const PI = Math.PI;
  export const PI2 = PI * 2;
  export const HALF_PI = PI / 2;
  export const QUART_PI = PI / 4;
  export const TENTH_PI = PI / 10;
  export const TWENTIETH_PI = PI / 20;

  export const rangeLoop = (min: number, n: number, max: number): number => {
    if (max < 0) {
      return n > max ? (max % n) + min : n < min ? (min - n + max) % max : n;
    }
    return n > max ? (n % max) + min : n < min ? (n - min + max) % max : n;
  };
  export const angleRangeLoop = (angle: number): number =>
    NumberUtils.rangeLoop(-PI2, angle, PI2);
  export const clamp = (min: number, n: number, max: number): number =>
    Math.min(Math.max(n, min), max);
  export const round = (n: number, precision: number): number =>
    Math.round(n * precision) / precision;
  export const tens = (n: number): number => Math.ceil(n / 10) - 1;
  export const finales = (n: number): number => Math.abs(n) % 10;

  export function inRange(n: number, min: number, max: number) {
    return n >= Math.min(min, max) && n <= Math.max(min, max);
  }

  /**
   *
   * @param point nombre de point qui seront converties en valeur
   * @param scalePoint échelle de grandeur de points à avoir pour atteindre le cap maximum
   * @param maxVal
   * @param minVal minimum value
   */
  export const scaleHyperTangent = (
    point: number,
    scalePoint: number,
    maxVal: number,
    minVal: number = 0
  ): number => Math.tanh(point / scalePoint) * (maxVal - minVal) + minVal;
  export const randomRange = (max: number, min?: number): number => {
    if (typeof min !== "undefined") {
      if (min > max) {
        max = min;
      }
      return Math.random() * (max - min) + min;
    }
    return Math.random() * max * 2 - max;
  };
  export const average = (numbers: number[]) => {
    return numbers.reduce((a, b) => a + b, 0) / numbers.length;
  };
}
