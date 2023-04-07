import { ArrayUtils } from "../commons";

export module Vector {
  export type Vector = number[];
  export const distanceToVector = (
    vectorA: Vector,
    vectorB: Vector
  ): number => {
    return length(ArrayUtils.operation(vectorA, vectorB, (a, b) => b - a));
  };
  export const length = (vector: Vector): number => {
    const square = vector.reduce((prev, curr) => prev + curr * curr, 0);
    return Math.sqrt(square);
  };
}
