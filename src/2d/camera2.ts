import { Point2 } from "./point2";

export class Camera2 {
  public positionX: number = 0;
  public positionY: number = 0;
  public scaleX: number = 1;
  public scaleY: number = 1;

  get position(): Point2 {
    return [this.positionX, this.positionY];
  }

  set position([x, y]: Point2) {
    this.positionX = x;
    this.positionY = y;
  }

  apply(ctx: CanvasRenderingContext2D) {
    this.applyScale(ctx);
    this.applyTranslation(ctx);
  }

  screenToWorld([px, py]: Point2): Point2 {
    return [
      px / this.scaleX + this.positionX,
      py / this.scaleY + this.positionY,
    ];
  }

  worldToScreen([px, py]: Point2): Point2 {
    return [
      (px - this.positionX) * this.scaleX,
      (py - this.positionY) * this.scaleY,
    ];
  }

  private applyScale(ctx: CanvasRenderingContext2D) {
    ctx.scale(this.scaleX, this.scaleY);
  }

  private applyTranslation(ctx: CanvasRenderingContext2D) {
    ctx.translate(-this.positionX, -this.positionY);
  }
}
