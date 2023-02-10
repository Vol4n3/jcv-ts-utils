import { Point } from "./point";
import { Circle } from "./circle";

export module Distance {
  import Point2 = Point.Point2;
  import Circle2 = Circle.Circle2;
  export const inRange = <T extends Point2>(
    which: Point2,
    others: T[],
    compareFunction: (distance: number) => boolean
  ): T[] => {
    const calcDist: { index: number; dist: number }[] = others.map(
      (other, index) => ({ index, dist: pointToPoint(which, other) })
    );
    return calcDist
      .filter((tile) => compareFunction(tile.dist))
      .map((tile) => others[tile.index]);
  };
  export function nearest<T extends Point2>(which: Point2, others: T[]) {
    return others.reduce<{ distance: number; item: T | undefined }>(
      (prev, current) => {
        const currentDistance: number = pointToPoint(which, current);
        if (currentDistance > prev.distance) {
          return prev;
        }
        return {
          distance: currentDistance,
          item: current,
        };
      },
      { distance: Infinity, item: undefined }
    );
  }
  export function further<T extends Point2>(which: Point2, others: T[]) {
    return others.reduce<{ distance: number; item: T | undefined }>(
      (prev, current) => {
        const currentDistance: number = pointToPoint(which, current);
        if (currentDistance < prev.distance) {
          return prev;
        }
        return {
          distance: currentDistance,
          item: current,
        };
      },
      { distance: 0, item: undefined }
    );
  }
  export function pointToCircle(
    point: Point2,
    { x, y, radius }: Circle2
  ): number {
    return pointToPoint({ x, y }, point) - radius;
  }
  export function circleToCircle(
    { x: x1, y: y1, radius: r1 }: Circle2,
    { x: x2, y: y2, radius: r2 }: Circle2
  ): number {
    return pointToPoint({ x: x1, y: y1 }, { x: x2, y: y2 }) - r1 - r2;
  }
  export function pointToPoint(
    { x: p1x, y: p1y }: Point2,
    { x: p2x, y: p2y }: Point2 = { x: 0, y: 0 }
  ): number {
    const dx = p1x - p2x;
    const dy = p1y - p2y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}
