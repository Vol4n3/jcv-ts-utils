import { Point } from "./point";

export module Rectangle {
  export type Rectangle2 = {
    w: number;
    h: number;
  } & Point.Point2;
}
