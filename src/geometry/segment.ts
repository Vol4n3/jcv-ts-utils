import { Point } from "./point";
import { Distance } from "./distance";

export module Segment {
  import Point2 = Point.Point2;
  import angleTo = Point.angleTo;
  import angleFrom = Point.angleFrom;
  export type Segment2 = { p1: Point2; p2: Point2 };

  export function wedge({
    p1: { x: p1x, y: p1y },
    p2: { x: p2x, y: p2y },
  }: Segment2): number {
    return p1x * p2y - p1y * p2x;
  }

  export function normalized(segment: Segment2): Point2 {
    const len = length(segment);
    if (len === 0) {
      return { x: 0, y: 0 };
    }
    const { x, y } = toPoint(segment);
    return { x: x / len, y: y / len };
  }

  export function toPoint({
    p1: { x: p1x, y: p1y },
    p2: { x: p2x, y: p2y },
  }: Segment2): Point2 {
    return { x: p2x - p1x, y: p2y - p1y };
  }

  export function SegmentAddLength(
    segment: Segment2,
    backward?: boolean
  ): Segment2 {
    const angle = backward ? backwardAngle(segment) : forwardAngle(segment);
    const len = length(segment);
    const dx = Math.cos(angle) * len;
    const dy = Math.sin(angle) * len;
    const { p1: p1, p2: p2 } = segment;
    const { x: p1x, y: p1y } = p1;
    const { x: p2x, y: p2y } = p2;
    return {
      p1: backward ? p1 : { x: p1x + dx, y: p1y + dy },
      p2: backward ? { x: p2x + dx, y: p2y + dy } : p2,
    };
  }

  export function center({
    p1: { x: p1x, y: p1y },
    p2: { x: p2x, y: p2y },
  }: Segment2): Point2 {
    return { x: (p1x + p2x) / 2, y: (p1y + p2y) / 2 };
  }

  export function length({ p1, p2 }: Segment2): number {
    return Distance.pointToPoint(p1, p2);
  }

  export function forwardAngle({ p1, p2 }: Segment2): number {
    return angleTo(p1, p2);
  }

  export function backwardAngle({ p1, p2 }: Segment2): number {
    return angleFrom(p1, p2);
  }

  export function interpolation(
    { p1: { x: p1x, y: p1y }, p2: { x: p2x, y: p2y } }: Segment2,
    t: number
  ): Point2 {
    return { x: t * p2x + (1 - t) * p1x, y: t * p2y + (1 - t) * p1y };
  }
}
