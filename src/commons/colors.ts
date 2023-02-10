export module Colors {
  /**
   *
   * @param red 0 - 255
   * @param green 0 - 255
   * @param blue 0 - 255
   * @param alpha 0 - 1
   */
  export function toVec4(
    red: number,
    green: number,
    blue: number,
    alpha: number
  ): Float32Array {
    return new Float32Array([red / 255, green / 255, blue / 255, alpha]);
  }
}
