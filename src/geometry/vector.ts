import { NumberUtils } from "../commons";

export module Vector {
  import OperationName = NumberUtils.OperationName;
  export type Vector = number[];
  export const operation = (
    type: OperationName,
    vector: Vector,
    value: number
  ): Vector => {
    return vector.map((v) => NumberUtils.operation(type, v, value));
  };
  export const operationBetweenVector = (
    type: OperationName,
    vectorA: Vector,
    vectorB: Vector
  ): Vector => {
    if (vectorA.length !== vectorB.length)
      throw new Error("vectors needs sames length");
    return vectorA.map((v, i) => NumberUtils.operation(type, v, vectorB[i]));
  };
  export const distanceToVector = (
    vectorA: Vector,
    vectorB: Vector
  ): number => {
    return length(operationBetweenVector("subtract", vectorB, vectorA));
  };
  export const length = (vector: Vector): number => {
    const square = vector.reduce((prev, curr) => prev + curr * curr, 0);
    return Math.sqrt(square);
  };
}
