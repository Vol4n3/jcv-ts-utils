export module ArrayUtils {
  export function pickRandomOne<T>(array: T[]): T {
    if (!array.length) {
      throw new Error("array is empty on pickRandom");
    }
    return array[Math.floor(Math.random() * array.length)];
  }
  export function shuffle<T>(array: T[]): T[] {
    const copy = Array.from(array);
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
  export function removeItem<T>(current: T[], index: number): T[] {
    return current.filter((_, i) => i !== index);
  }
  export function operation<T>(
    a: T[],
    b: T | T[],
    method: (a: T, b: T) => T
  ): T[] {
    if (!Array.isArray(b)) {
      return a.map((item) => method(item, b));
    }
    if (a.length >= b.length) {
      return a.map((item, index) =>
        b.length <= index ? item : method(item, b[index])
      );
    }
    return b.map((item, index) =>
      a.length <= index ? item : method(a[index], item)
    );
  }
  export function fillWithIndex(size: number, start: number = 0): number[] {
    return new Array(size).fill(start).map((v, i) => v + i);
  }

  export function updateById<T>(current: T[], index: number, value: T): T[] {
    return current.map((item, i) => (i === index ? value : item));
  }
  export function removeDuplicated<T>(current: T[]): T[] {
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

  export function range(start: number, end: number): number[] {
    const length = Math.abs(end - start) + 1;
    const step = end >= start ? 1 : -1;

    return Array.from({ length }, (_, i) => start + i * step);
  }
}
