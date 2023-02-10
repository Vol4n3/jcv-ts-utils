import { Point } from "./point";
import Point2 = Point.Point2;

export class Camera2 implements Point2 {
  x: number = 0;
  y: number = 0;
  scaleX: number = 1;
  scaleY: number = 1;

  apply(ctx: CanvasRenderingContext2D) {
    this.applyScale(ctx);
    this.applyTranslation(ctx);
  }

  screenToWorld({ x: px, y: py }: Point2): Point2 {
    return {
      x: px / this.scaleX + this.x,
      y: py / this.scaleY + this.y,
    };
  }

  worldToScreen({ x: px, y: py }: Point2): Point2 {
    return {
      x: (px - this.x) * this.scaleX,
      y: (py - this.y) * this.scaleY,
    };
  }

  private applyScale(ctx: CanvasRenderingContext2D) {
    ctx.scale(this.scaleX, this.scaleY);
  }

  private applyTranslation(ctx: CanvasRenderingContext2D) {
    ctx.translate(-this.x, -this.y);
  }
}
