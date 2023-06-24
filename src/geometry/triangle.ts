import { Point } from "./point";

export module Triangle {
  export type Triangle2 = {
    p1: Point.Point2;
    p2: Point.Point2;
    p3: Point.Point2;
  };
  /**
   *
   * @param base length of triangle base
   * @param a length of a side
   * @param b length of another side
   * @return length of H
   */
  export const calculH = (base: number, a: number, b: number): number => {
    const halfBase = (base * base + a * a - b * b) / (base * 2);
    return Math.sqrt(a * a - halfBase * halfBase);
  };
}
