export module ArrayUtils {
  function pickRandomOne<T>(array: T[]): T {
    if (!array.length) {
      throw new Error("array is empty on pickRandom");
    }
    return array[Math.floor(Math.random() * array.length)];
  }

  function removeItem<T>(current: T[], index: number): T[] {
    return current.filter((_, i) => i !== index);
  }

  function fillWithIndex(size: number, start: number = 0): number[] {
    return new Array(size).fill(start).map((v, i) => v + i);
  }

  function updateById<T>(current: T[], index: number, value: T): T[] {
    return current.map((item, i) => (i === index ? value : item));
  }
  function removeIdentical<T>(current: T[]): T[] {
    return current.filter((v, i, self) => self.indexOf(v) === i);
  }

  export function translateItems<T>(arr: T[], from: number, to: number): T[] {
    if (to < 0) {
      return arr;
    }
    const copy = arr.slice();
    copy.splice(to, 0, copy.splice(from, 1)[0]);
    return copy;
  }
}
