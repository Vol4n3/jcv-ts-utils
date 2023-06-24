import { Point } from "./point";
import { searchAStar } from "./a-star";

describe("SearchAStar", () => {
  const grid = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1, weight: 0 },
    { x: 2, y: 1 },
    { x: 0, y: 2 },
    { x: 1, y: 2 },
    { x: 2, y: 2 },
  ];

  it("finds the shortest path", () => {
    const start: Point.Point2 = { x: 0, y: 0 };
    const end: Point.Point2 = { x: 2, y: 2 };
    const expectedPath: Point.Point2[] = [
      {
        x: 1,
        y: 1,
      },
      {
        x: 2,
        y: 2,
      },
    ];

    const result = searchAStar(grid, start, end, {
      closest: false,
      diagonal: true,
    });
    expect(result).toEqual(expectedPath);
  });

  it("finds the shortest path vertical only", () => {
    const start: Point.Point2 = { x: 0, y: 0 };
    const end: Point.Point2 = { x: 0, y: 2 };
    const expectedPath: Point.Point2[] = [
      { x: 0, y: 1 },
      { x: 0, y: 2 },
    ];

    const result = searchAStar(grid, start, end, {
      closest: false,
      diagonal: false,
    });
    expect(result).toEqual(expectedPath);
  });
});
