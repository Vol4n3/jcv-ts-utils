import { ArrayUtils } from "./array-utils";

describe("shuffle test", () => {
  test("should not modify original array", () => {
    const original = [1, 2, 3, 4, 5];
    const copy = Array.from(original);
    ArrayUtils.shuffle(original);
    expect(original).toEqual(copy);
  });
  test("should have same elements", () => {
    const origin = [1, 2, 3, 4, 5];
    const shuffle = ArrayUtils.shuffle(origin);
    expect(shuffle).not.toBe(origin);
    expect(shuffle).toHaveLength(origin.length);
    expect(shuffle).toEqual(expect.arrayContaining(origin));
  });
  test("should have shuffle", () => {
    const origin = [1, 2, 3, 4, 5];
    const shuffle = ArrayUtils.shuffle(origin);
    expect(shuffle).not.toBe(origin);
    expect(shuffle).toHaveLength(origin.length);
    expect(shuffle).toEqual(expect.arrayContaining(origin));
  });
});

describe("pickRandomOne", () => {
  test("should not modify original array", () => {
    const original = [1, 2, 3, 4, 5];
    const copy = Array.from(original);
    ArrayUtils.pickRandomOne(original);
    expect(original).toEqual(copy);
  });
  test("throw error when empty array", () => {
    expect(() => ArrayUtils.pickRandomOne([])).toThrow(
      "array is empty on pickRandom"
    );
  });

  test("return an picked element", () => {
    const array = [1, 2, 3, 4, 5];
    const randomElement = ArrayUtils.pickRandomOne(array);
    expect(array).toContain(randomElement);
  });
});

describe("removeItem", () => {
  test("should not modify original array", () => {
    const original = [1, 2, 3, 4, 5];
    const copy = Array.from(original);
    ArrayUtils.removeItem(original, 5);
    expect(original).toEqual(copy);
  });
  test("remove item", () => {
    const array = [1, 2, 3, 4, 5];
    const indexToRemove = 2;
    const expectedResult = [1, 2, 4, 5];
    const result = ArrayUtils.removeItem(array, indexToRemove);
    expect(result).toEqual(expectedResult);
  });

  test("dont remove element if index is not in range", () => {
    const array = [1, 2, 3, 4, 5];
    const indexToRemove = -1;
    const expectedResult = Array.from(array);
    const result = ArrayUtils.removeItem(array, indexToRemove);
    expect(result).toEqual(expectedResult);

    const indexToRemove2 = array.length;
    const result2 = ArrayUtils.removeItem(array, indexToRemove2);
    expect(result2).toEqual(expectedResult);
  });
});
describe("fillWithIndex", () => {
  test("creates an array of the specified size", () => {
    const size = 5;
    const result = ArrayUtils.fillWithIndex(size);
    expect(result).toHaveLength(size);
  });

  test("fills the array with index values starting from the default value (0)", () => {
    const size = 5;
    const expectedResult = [0, 1, 2, 3, 4];
    const result = ArrayUtils.fillWithIndex(size);
    expect(result).toEqual(expectedResult);
  });

  test("fills the array with index values starting from a custom value", () => {
    const size = 5;
    const start = 10;
    const expectedResult = [10, 11, 12, 13, 14];
    const result = ArrayUtils.fillWithIndex(size, start);
    expect(result).toEqual(expectedResult);
  });
});

describe("updateById", () => {
  test("updates the element at the specified index", () => {
    const array = [1, 2, 3, 4, 5];
    const indexToUpdate = 2;
    const newValue = 99;
    const expectedResult = [1, 2, 99, 4, 5];
    const result = ArrayUtils.updateById(array, indexToUpdate, newValue);
    expect(result).toEqual(expectedResult);
  });

  test("does not modify the original array", () => {
    const array = [1, 2, 3, 4, 5];
    const originalArrayCopy = Array.from(array);
    ArrayUtils.updateById(array, 1, 99);
    expect(array).toEqual(originalArrayCopy);
  });

  test("does not update any element when the index is out of bounds", () => {
    const array = [1, 2, 3, 4, 5];
    const indexToUpdate = -1;
    const newValue = 99;
    const expectedResult = Array.from(array);
    const result = ArrayUtils.updateById(array, indexToUpdate, newValue);
    expect(result).toEqual(expectedResult);

    const indexToUpdate2 = array.length;
    const result2 = ArrayUtils.updateById(array, indexToUpdate2, newValue);
    expect(result2).toEqual(expectedResult);
  });
});

describe("removeIdentical", () => {
  test("removes duplicate elements from the array", () => {
    const array = [1, 2, 3, 2, 1, 4, 5, 4];
    const expectedResult = [1, 2, 3, 4, 5];
    const result = ArrayUtils.removeIdentical(array);
    expect(result).toEqual(expectedResult);
  });

  test("does not modify the original array", () => {
    const array = [1, 2, 3, 2, 1, 4, 5, 4];
    const originalArrayCopy = Array.from(array);
    ArrayUtils.removeIdentical(array);
    expect(array).toEqual(originalArrayCopy);
  });

  test("returns an empty array when the input is an empty array", () => {
    const array: number[] = [];
    const expectedResult: number[] = [];
    const result = ArrayUtils.removeIdentical(array);
    expect(result).toEqual(expectedResult);
  });

  test("returns the same array when there are no duplicates", () => {
    const array = [1, 2, 3, 4, 5];
    const expectedResult = Array.from(array);
    const result = ArrayUtils.removeIdentical(array);
    expect(result).toEqual(expectedResult);
  });
});

describe("rangeArray", () => {
  test("should return an reverse array when the length is negative", () => {
    const start = 5;
    const end = 3;
    const result = ArrayUtils.range(start, end);
    expect(result).toEqual([5, 4, 3]);
  });

  test("should return an array with too element if length = 1", () => {
    const start = 4;
    const end = 5;
    const result = ArrayUtils.range(start, end);
    expect(result).toEqual([4, 5]);
  });

  test("should return a range array with the correct length and values", () => {
    const start = 3;
    const end = 7;
    const result = ArrayUtils.range(start, end);
    expect(result).toEqual([3, 4, 5, 6, 7]);
  });

  test("should return an empty array when the start and end values are equal", () => {
    const start = 5;
    const end = 5;
    const result = ArrayUtils.range(start, end);
    expect(result).toEqual([5]);
  });

  test("should handle the edge case when start is 0", () => {
    const start = 0;
    const end = 3;
    const result = ArrayUtils.range(start, end);
    expect(result).toEqual([0, 1, 2, 3]);
  });
});
