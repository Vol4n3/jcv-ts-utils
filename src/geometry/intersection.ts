import { Point } from "./point";
import { Rectangle } from "./rectangle";
import { NumberUtils } from "../commons";
import { Circle } from "./circle";
import { Distance } from "./distance";
import { Segment } from "./segment";

export module Intersection {
  import Point2 = Point.Point2;
  import Rectangle2 = Rectangle.Rectangle2;
  import inRange = NumberUtils.inRange;
  import Circle2 = Circle.Circle2;
  import Segment2 = Segment.Segment2;

  export function pointInRectangle(
    { x: x, y: y }: Point2,
    rectangle: Rectangle2
  ): boolean {
    return (
      inRange(x, rectangle.x, rectangle.x + rectangle.w) &&
      inRange(y, rectangle.y, rectangle.y + rectangle.h)
    );
  }

  export function pointInCircle(
    point: Point2,
    circle: Circle2,
    strict?: boolean
  ) {
    if (strict) {
      return Distance.pointToCircle(point, circle) < 0;
    }
    return Distance.pointToCircle(point, circle) <= 0;
  }

  export function cercleInRectangle(
    circle: Circle2,
    rect: Rectangle2
  ): boolean {
    const distX = Math.abs(circle.x - rect.x - rect.w / 2);
    const distY = Math.abs(circle.y - rect.y - rect.h / 2);

    if (distX > rect.w / 2 + circle.radius) {
      return false;
    }
    if (distY > rect.h / 2 + circle.radius) {
      return false;
    }

    if (distX <= rect.w / 2) {
      return true;
    }
    if (distY <= rect.h / 2) {
      return true;
    }

    const dx = distX - rect.w / 2;
    const dy = distY - rect.h / 2;
    return dx * dx + dy * dy <= circle.radius * circle.radius;
  }

  export function rectInRect(rectA: Rectangle2, rectB: Rectangle2): boolean {
    return (
      rectA.x + rectA.w >= rectB.x &&
      rectA.x <= rectB.x + rectB.w &&
      rectA.y + rectA.h >= rectB.y &&
      rectA.y <= rectB.y + rectB.h
    );
  }

  export function pointToSegment(point: Point2, { p1, p2 }: Segment2): boolean {
    const d1 = Distance.pointToPoint(point, p1);
    const d2 = Distance.pointToPoint(point, p2);
    const segmentLen = Distance.pointToPoint(p1, p2);
    const lineWidth = 0.1;
    return (
      d1 + d2 >= segmentLen - lineWidth && d1 + d2 <= segmentLen + lineWidth
    );
  }

  export function segmentToSegment(
    segmentA: Segment2,
    segmentB: Segment2,
    projection?: boolean
  ): Point2 | null {
    const { p1: sAP1, p2: sAP2 } = segmentA;
    const { p1: sBP1, p2: sBP2 } = segmentB;
    const collisionPoint = segmentToLine(segmentA, segmentB);
    if (collisionPoint === null) {
      return null;
    }
    if (projection) {
      return collisionPoint;
    }
    const { x: sAP1x, y: sAP1y } = sAP1;
    const { x: sAP2x, y: sAP2y } = sAP2;
    const { x: sBP1x, y: sBP1y } = sBP1;
    const { x: sBP2x, y: sBP2y } = sBP2;
    const { x: ipx, y: ipy } = collisionPoint;
    const rx0 = (ipx - sAP1x) / (sAP2x - sAP1x),
      ry0 = (ipy - sAP1y) / (sAP2y - sAP1y),
      rx1 = (ipx - sBP1x) / (sBP2x - sBP1x),
      ry1 = (ipy - sBP1y) / (sBP2y - sBP1y);
    if (
      ((rx0 >= 0 && rx0 <= 1) || (ry0 >= 0 && ry0 <= 1)) &&
      ((rx1 >= 0 && rx1 <= 1) || (ry1 >= 0 && ry1 <= 1))
    ) {
      return collisionPoint;
    } else {
      return null;
    }
  }

  export function segmentToLine(
    { p1: { x: sP1x, y: sP1y }, p2: { x: sP2x, y: sP2y } }: Segment2,
    { p1: { x: lP1x, y: lP1y }, p2: { x: lP2x, y: lP2y } }: Segment2
  ): Point2 | null {
    const A1 = sP2y - sP1y;
    const B1 = sP1x - sP2x;
    const C1 = A1 * sP1x + B1 * sP1y;
    const A2 = lP2y - lP1y;
    const B2 = lP1x - lP2x;
    const C2 = A2 * lP1x + B2 * lP1y;
    const denominator = A1 * B2 - A2 * B1;
    if (denominator === 0) {
      return null;
    }
    return {
      x: (B2 * C1 - B1 * C2) / denominator,
      y: (A1 * C2 - A2 * C1) / denominator,
    };
  }

  export function pointToLine(point: Point2, { p1, p2 }: Segment2): Point2 {
    const len = Distance.pointToPoint(p1, p2);
    const { x: sP1x, y: sP1y } = p1;
    const { x: sP2x, y: sP2y } = p2;
    const { x: px, y: py } = point;

    const dot =
      ((px - sP1x) * (sP2x - sP1x) + (py - sP1y) * (sP2y - sP1y)) / (len * len);

    return { x: sP1x + dot * (sP2x - sP1x), y: sP1y + dot * (sP2y - sP1y) };
  }

  export function circleToSegment(
    { x: cx, y: cy, radius }: Circle2,
    segment: Segment2
  ): Point2 | null {
    const cp = { x: cx, y: cy };
    const { p1, p2 } = segment;
    const { x: p1x, y: p1y } = p1;
    const { x: p2x, y: p2y } = p2;
    const side1 = Distance.pointToPoint(p1, cp);
    const side2 = Distance.pointToPoint(p2, cp);
    if (radius > side1) {
      return { x: p1x, y: p1y };
    }
    if (radius > side2) {
      return { x: p2x, y: p2y };
    }
    const pointLine = pointToLine(cp, segment);
    if (!pointToSegment(pointLine, segment)) return null;
    const dist = Distance.pointToPoint(pointLine, cp);

    return dist <= radius ? pointLine : null;
  }
}
