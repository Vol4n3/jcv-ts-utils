import { NumberUtils } from "./number-utils";
const { clamp, rangeLoop } = NumberUtils;

test("should clamp number", () => {
  expect(clamp(5, 25, 100)).toEqual(25);
  expect(clamp(5, -10, 100)).toEqual(5);
  expect(clamp(-2, -15, 100)).toEqual(-2);
  expect(clamp(-2, 1000, 100)).toEqual(100);
  expect(clamp(-60, 1000, -1)).toEqual(-1);
  expect(clamp(-60, -1000, -1)).toEqual(-60);
});

test("should range number", () => {
  expect(rangeLoop(1.5, 3.2, 3.1)).toEqual(1.6);
  expect(rangeLoop(5, 4, 99)).toEqual(98);
  expect(rangeLoop(5, -10, 100)).toEqual(85);
  expect(rangeLoop(0, -10, 100)).toEqual(90);
  expect(rangeLoop(-5, -10, 100)).toEqual(95);
  expect(rangeLoop(-100, -101, -20)).toEqual(-19);
  expect(rangeLoop(0, 101, 100)).toEqual(1);
  expect(rangeLoop(20, 101, 100)).toEqual(21);
  expect(rangeLoop(-200, -99, -100)).toEqual(-201);
  expect(rangeLoop(10, 71, 70)).toEqual(11);
});
