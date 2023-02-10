import { Point } from "./point";

export module Circle {
  import Point2 = Point.Point2;
  export type Circle2 = { radius: number } & Point2;
}
