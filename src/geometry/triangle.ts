export module Triangle {
  /**
   *
   * @param base length of triangle base
   * @param a length of a side
   * @param b length of another side
   * @return length of H
   */
  const calculH = (base: number, a: number, b: number): number => {
    const halfBase = (base * base + a * a - b * b) / (base * 2);
    return Math.sqrt(a * a - halfBase * halfBase);
  };
}
