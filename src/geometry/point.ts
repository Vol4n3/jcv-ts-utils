import { NumberUtils } from "../commons";
import OperationName = NumberUtils.OperationName;
import rangeLoop = NumberUtils.rangeLoop;

export module Point {
  export type Point2 = { x: number; y: number };

  export const samePosition = (
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
    return { x: rangeLoop(xMin, x, xMax), y: rangeLoop(yMin, y, yMax) };
  }

  export function sum(points: Point2[]): Point2 {
    return points.reduce(
      ({ x: prevX, y: prevY }, { x: currentX, y: currentY }) => ({
        x: prevX + currentX,
        y: prevY + currentY,
      }),
      { x: 0, y: 0 }
    );
  }

  export function operation(
    type: OperationName,
    { x: aX, y: aY }: Point2,
    b: number | Point2
  ): Point2 {
    if (typeof b === "number") {
      return {
        x: NumberUtils.operation(type, aX, b),
        y: NumberUtils.operation(type, aY, b),
      };
    }
    const { x: bX, y: bY } = b;
    return {
      x: NumberUtils.operation(type, aX, bX),
      y: NumberUtils.operation(type, aY, bY),
    };
  }

  export function average(points: Point2[]): Point2 {
    return operation("divide", sum(points), points.length);
  }

  export function destination(
    { x: x, y: y }: Point2,
    angle: number,
    length: number
  ): Point2 {
    return { x: x + Math.cos(angle) * length, y: y + Math.sin(angle) * length };
  }

  export function coordinateRatioToScreen(
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
}
