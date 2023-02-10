import { Point } from "./point";

export module Rectangle {
  import Point2 = Point.Point2;
  export type Rectangle2 = {
    w: number;
    h: number;
  } & Point2;
}
