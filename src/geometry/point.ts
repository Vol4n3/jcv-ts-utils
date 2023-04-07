import { NumberUtils } from "../commons";

export module Point {
  export type Point2 = { x: number; y: number };

  export const equal = (
    { x: p1x, y: p1y }: Point2,
    { x: p2x, y: p2y }: Point2
  ): boolean => {
    return p1x === p2x && p1y === p2y;
  };

  export function lerp(
    { x: x1, y: y1 }: Point2,
    { x: x2, y: y2 }: Point2,
    t: number
  ): Point2 {
    return { x: NumberUtils.lerp(x1, x2, t), y: NumberUtils.lerp(y1, y2, t) };
  }

  export function opposite({ x, y }: Point2): Point2 {
    return { x: -y, y: -x };
  }

  export function perp({ x, y }: Point2): Point2 {
    return { x: -y, y: x };
  }

  export function dotProduct(
    { x: p1x, y: p1y }: Point2,
    { x: p2x, y: p2y }: Point2
  ): number {
    return p1x * p2x + p1y * p2y;
  }

  export function angleTo(
    { x: p1x, y: p1y }: Point2,
    { x: p2x, y: p2y }: Point2
  ): number {
    return Math.atan2(p2y - p1y, p2x - p1x);
  }

  export function angleFrom(
    { x: p1x, y: p1y }: Point2,
    { x: p2x, y: p2y }: Point2
  ): number {
    return Math.atan2(p1y - p2y, p1x - p2x);
  }

  export function rotate(
    { x: originX, y: originY }: Point2,
    { x: rotateAnchorX, y: rotateAnchorY }: Point2,
    angle: number
  ): Point2 {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const dx = originX - rotateAnchorX;
    const dy = originY - rotateAnchorY;
    return {
      x: dx * cos + dy * sin + rotateAnchorX,
      y: -dx * sin + dy * cos + rotateAnchorY,
    };
  }

  export function clamp(
    { x: x, y: y }: Point2,
    { x: xMin, y: yMin }: Point2,
    { x: xMax, y: yMax }: Point2
  ): Point2 {
    return {
      x: NumberUtils.clamp(xMin, x, xMax),
      y: NumberUtils.clamp(yMin, y, yMax),
    };
  }

  export function boundaryLoop(
    { x: x, y: y }: Point2,
    { x: xMin, y: yMin }: Point2,
    { x: xMax, y: yMax }: Point2
  ): Point2 {
    return {
      x: NumberUtils.rangeLoop(xMin, x, xMax),
      y: NumberUtils.rangeLoop(yMin, y, yMax),
    };
  }

  export function sum(points: Point2[]): Point2 {
    return points.reduce(
      (prev, curr) => operation(prev, curr, (a, b) => a + b),
      { x: 0, y: 0 }
    );
  }
  export function operation<T>(
    a: Point2,
    b: number | Point2,
    method: (a: number, b: number) => number
  ): Point2 {
    if (typeof b === "number") {
      return {
        x: method(a.x, b),
        y: method(a.y, b),
      };
    }
    return {
      x: method(a.x, b.x),
      y: method(a.y, b.y),
    };
  }
  export function average(points: Point2[]): Point2 {
    return operation(sum(points), points.length, (a, b) => a / b);
  }

  export function translateByVector(
    point: Point2,
    angle: number,
    length: number
  ): Point2 {
    return operation(
      point,
      { x: Math.cos(angle) * length, y: Math.sin(angle) * length },
      (a, b) => a + b
    );
  }

  export function coordinateRatioToScreen(
    x: number,
    y: number,
    width: number,
    height: number
  ): Point2 {
    return {
      x: Math.round(width * x),
      y: Math.round(height * y),
    };
  }
}
