import { Intersection } from "./intersection";
import { Point } from "./point";
import { Circle } from "./circle";
import { Rectangle } from "./rectangle";
import Rectangle2 = Rectangle.Rectangle2;
import Circle2 = Circle.Circle2;
import Point2 = Point.Point2;

export class QuadTree<T extends Point2> {
  public objects: T[] = [];
  divided: boolean = false;
  /**      .----.----.
     //      | NW | NE |
     //      '----'----'
     //      | SW | SE |
     //      '----'----'
     */
  private northwest: QuadTree<T> | undefined;
  private northeast: QuadTree<T> | undefined;
  private southwest: QuadTree<T> | undefined;
  private southeast: QuadTree<T> | undefined;

  constructor(public boundary: Rectangle2, public capacity: number = 4) {}

  subdivide() {
    const x = this.boundary.x,
      y = this.boundary.y,
      w = this.boundary.w / 2,
      h = this.boundary.h / 2;

    const ne: Rectangle2 = { x: x + w, y: y - h, w, h };
    this.northeast = new QuadTree<T>(ne, this.capacity);
    const nw: Rectangle2 = { x: x - w, y: y - h, w, h };
    this.northwest = new QuadTree<T>(nw, this.capacity);
    const se: Rectangle2 = { x: x + w, y: y + h, w, h };
    this.southeast = new QuadTree<T>(se, this.capacity);
    const sw: Rectangle2 = { x: x - w, y: y + h, w, h };
    this.southwest = new QuadTree<T>(sw, this.capacity);
    this.divided = true;
  }

  insert(obj: T) {
    if (!Intersection.pointInRectangle(obj, this.boundary)) {
      return;
    }
    if (this.objects.length < this.capacity) {
      this.objects.push(obj);
      return;
    }
    if (!this.divided) {
      this.subdivide();
    }
    this.northeast?.insert(obj);
    this.northwest?.insert(obj);
    this.southeast?.insert(obj);
    this.southwest?.insert(obj);
  }

  queryCircle(range: Circle2): T[] {
    const found: T[] = [];
    if (!Intersection.cercleInRectangle(range, this.boundary)) {
      return found;
    } else {
      this.objects.forEach((object) => {
        if (Intersection.pointInCircle(object, range)) {
          found.push(object);
        }
      });
      this.northwest && found.push(...this.northwest.queryCircle(range));
      this.northeast && found.push(...this.northeast.queryCircle(range));
      this.southwest && found.push(...this.southwest.queryCircle(range));
      this.southeast && found.push(...this.southeast.queryCircle(range));
      return found;
    }
  }

  queryRect(range: Rectangle2): T[] {
    const found: T[] = [];
    if (!Intersection.rectInRect(this.boundary, range)) {
      return found;
    } else {
      this.objects.forEach((object) => {
        if (Intersection.pointInRectangle(object, range)) {
          found.push(object);
        }
      });
      this.northwest && found.push(...this.northwest.queryRect(range));
      this.northeast && found.push(...this.northeast.queryRect(range));
      this.southwest && found.push(...this.southwest.queryRect(range));
      this.southeast && found.push(...this.southeast.queryRect(range));

      return found;
    }
  }
}
